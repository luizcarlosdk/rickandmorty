import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalCharacter, setModalCharacter] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const handleClick = (character) => {
    setModalCharacter(character);
    setModal(!modal);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const previousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
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
    <div>
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
      <div className="pageButtons">
        <button onClick={previousPage} disabled={pageNumber === 1}>
          Página Anterior
        </button>
        <button onClick={nextPage}>Próxima página</button>
      </div>
    </div>
  );
}

export default Characters;
