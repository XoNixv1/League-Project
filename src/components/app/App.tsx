import ChampList from "../champsList/ChampList";
import "./app.scss";
import ContentHeader from "../contentHeader/ContentHeader";

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <ContentHeader />
        <div className="inner">
          <ChampList />
        </div>
      </div>
    </main>
  );
}

export default App;
