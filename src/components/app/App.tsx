import ChampList from "../champsList/ChampList";
import Header from "../header/header";
import "./app.scss";

function App() {
  return (
    <main className="App">
      <Header />
      <div className="content">
        <ChampList />
      </div>
    </main>
  );
}

export default App;
