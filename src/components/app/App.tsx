import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Header from "../header/Header";
import "../../styles/animations.scss";
import React, { Suspense } from "react";

const ChampPage = React.lazy(() => import("../champPage/ChampPage"));
const ChampList = React.lazy(() => import("../champsList/ChampList"));

function App() {
  return (
    <BrowserRouter
      basename="XoNixv1"
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
      <Header />
      <div id="toTop"></div>
      <div className="wrapper">
        <SwitchTransition>
          <CSSTransition
            key={location.key}
            timeout={500}
            classNames="page"
            unmountOnExit
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Routes location={location}>
                <Route path="/" element={<ChampList />} />
                <Route path="/:champId" element={<ChampPage />} />
              </Routes>
            </Suspense>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </main>
  );
}

export default App;
