import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChampPage from "../champPage/ChampPage";
import ChampList from "../champsList/ChampList";
import "./app.scss";

function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
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
    </BrowserRouter>
  );
}

export default App;
