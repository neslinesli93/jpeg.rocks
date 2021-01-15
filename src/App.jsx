import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Router from "preact-router";

import * as converter from "./converter";
import About from "./pages/About";
import Main from "./pages/Main";
import Header from "./components/Header";

import urls from "../prerender-urls.json";

const getTitle = (path) => {
  return urls.find((u) => u.url === path).title;
};

const App = () => {
  const [canRender, setCanRender] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    // Init worker with wasm converter
    converter
      .init()
      .then(() => setCanRender(true))
      .catch((err) => {
        console.error(err);

        if (err && typeof err.toString === "function") {
          setInitError(err.toString());
        } else {
          setInitError(JSON.stringify(err));
        }

        setCanRender(true);
      });
  }, []);

  return (
    <>
      <Header />

      <Router>
        <Main
          path="/"
          title={getTitle("/")}
          canRender={canRender}
          initError={initError}
        />
        <About path="/about" title={getTitle("/about")} />
      </Router>
    </>
  );
};

export default App;
