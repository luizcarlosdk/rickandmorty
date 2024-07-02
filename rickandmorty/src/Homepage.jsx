import Characters from "./components/Characters";
import { useState } from "react";

const Homepage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const title = "Rick and Morty Characters";

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const previousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="content">
      <h1 className="title">{title}</h1>
      <Characters pageNumber={pageNumber}/>
      <div className="pageButtons">
        <button onClick={previousPage} disabled={pageNumber === 1}>
          Página Anterior
        </button>
        <button onClick={nextPage}>Próxima página</button>
      </div>
    </div>
  );
};

export default Homepage;
