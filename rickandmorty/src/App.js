import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  URL = "https://rickandmortyapi.com/graphql";
  useEffect(() => {
    const fetchCharacters = async () => {
      const query = `query { characters { results { name image status } } } `;
      axios
        .post(
          URL,
          {
            query,
          },
          { timeout: 5000 }
        )

        .then((response) => {
          setCharacters(response.data.data.characters.results);
        })

        .catch((error) => {
          window.alert(error);
        });
    };

    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Rick and Morty Characters</h1>
  
        {characters.map((character) => (
          <div key={character.name}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
          </div>
        ))}
   
    </div>
  );
}

export default App;
