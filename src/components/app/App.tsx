import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChampPage from "../champPage/ChampPage";
import ChampList from "../champsList/ChampList";
import "./app.scss";

function App() {
  return (
    <Router>
      <main className="App">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<ChampList />} />
            <Route path="/:champId" element={<ChampPage />} />
          </Routes>
          {/* <ChampList /> */}
          {/* <ChampPage /> */}
        </div>
      </main>
    </Router>
  );
}

export default App;
