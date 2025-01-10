import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import ChampPage from "../champPage/ChampPage";
import ChampList from "../champsList/ChampList";
import "./app.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Header from "../header/Header";
import "../../styles/animations.scss";

function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  return (
    <main className="App">
      <div id="toTop"></div>
      <Header />
      <div className="wrapper">
        <SwitchTransition>
          <CSSTransition
            key={location.key}
            timeout={500}
            classNames="page"
            unmountOnExit
          >
            <Routes location={location}>
              <Route path="/" element={<ChampList />} />
              <Route path="/:champId" element={<ChampPage />} />
            </Routes>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </main>
  );
}

export default App;
