import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Router from "preact-router";

import * as converter from "./converter";
import About from "./pages/About";
import Main from "./pages/Main";

const App = () => {
  const [canRender, setCanRender] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
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
    <Router>
      <Main path="/" canRender={canRender} initError={initError} />
      <About path="/about" />
    </Router>
  );
};

export default App;
