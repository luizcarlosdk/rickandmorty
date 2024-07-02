import "./App.css";
import Characters from "./components/Characters";

function App() {
  const title = "Rick and Morty Characters"
  return (
    <div className="App">
      <div className="content">
        <h1>{title}</h1>
        <Characters/>
      </div>
    </div>
  );
}

export default App;
