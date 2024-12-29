import ChampPage from "../champPage/ChampPage";
import ChampList from "../champsList/ChampList";
import "./app.scss";

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <ChampList />
        <ChampPage />
      </div>
    </main>
  );
}

export default App;
