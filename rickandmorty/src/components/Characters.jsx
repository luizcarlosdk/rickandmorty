import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Characters({pageNumber}) {
  const [characters, setCharacters] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalCharacter, setModalCharacter] = useState({});


  const handleClick = (character) => {
    setModalCharacter(character);
    setModal(!modal);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      const query = `query { characters(page:${pageNumber}) { results { name image status episode {id }} } }`;

      try {
        const response = await axios.post(
          "https://rickandmortyapi.com/graphql",
          { query },
          { timeout: 5000 }
        );

        setCharacters(response.data.data.characters.results);
      } catch (error) {
        if (error.request) {
          window.alert("A API do Rick and Morty parou de responder.");
        } else if (error.response) {
          window.alert(
            `A API do Rick and Morty devolveu um erro: ${error.response.status}`
          );
          console.log(error.response.data);
          console.log(error.response.headers);
        } else {
          window.alert(
            `Um erro ocorreu ao fazer a requisição: ${error.message}`
          );
        }
        console.error(error);
      }
    };

    fetchCharacters();
  }, [pageNumber]);

  return (
      <div className="charactersList">
        {modal && (
          <Modal
            name={modalCharacter.name}
            imageURL={modalCharacter.image}
            episodes={modalCharacter.episode}
            closeModal={handleClick}
          />
        )}

        {characters.map((character) => (
          <div className="card" onClick={() => handleClick(character)}>
            <img
              className="cardImage"
              src={character.image}
              alt={character.name}
            />
            <h2>{character.name}</h2>
            <p>
              <b>Status</b>: {character.status}
            </p>
          </div>
        ))}
      </div>

  );
}

export default Characters;
