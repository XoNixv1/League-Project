import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import ChampPage from "../champPage/ChampPage";
import ChampList from "../champsList/ChampList";
import "./app.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./header/Header";

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
      <Header></Header>
      <div className="wrapper">
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Routes location={location}>
              <Route path="/" element={<ChampList />} />
              <Route path="/:champId" element={<ChampPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </main>
  );
}

export default App;
