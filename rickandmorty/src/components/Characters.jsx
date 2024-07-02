import axios from "axios";
import { useEffect, useState } from "react";

function Characters() {
  const [characters, setCharacters] = useState([]);
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
        });
    };

    fetchCharacters();
  }, []);

  return (
    <div className="charactersList">
      {characters.map((character) => (
          <div className="card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
          </div>
      ))}
    </div>
  );
}

export default Characters;
