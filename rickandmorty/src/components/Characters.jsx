import axios from "axios";
import { useEffect, useState } from "react";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalCharacter, setModalCharacter] = useState({});

  const HandleClick = (character) => {
    setModalCharacter(character);
    setModal(!modal);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      const query = `query { characters { results { name image status episode {id }} } } `;
      axios
        .post(
          "https://rickandmortyapi.com/graphql",
          {
            query,
          },
          { timeout: 5000 }
        )

        .then((response) => {
          setCharacters(response.data.data.characters.results);
          console.log(characters);
        })

        .catch((error) => {
          window.alert(error);
          console.log(error)
        });
    };

    fetchCharacters();
  });

  return (
    <div className="charactersList">
      {modal && (
        <div className="modal">
          <div className="modalContent">
            <img
              className="cardImage"
              src={modalCharacter.image}
              alt={modalCharacter.name}
            />
            <h2>{modalCharacter.name}</h2>
            <p>
              <b>Episodes</b>:{" "}
              {modalCharacter.episode.map((episode) => episode.id).join(", ")}
            </p>
            <button className="closeModal" onClick={HandleClick}>
              Retornar a listagem
            </button>
          </div>
        </div>
      )}

      {characters.map((character) => (
        <div className="card" onClick={() => HandleClick(character)}>
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
