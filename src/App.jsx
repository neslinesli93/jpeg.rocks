import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import * as converter from "./converter";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";

const App = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    converter
      .init()
      .then(() => setCanRender(true))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!canRender) {
    return (
      <div className="loader_wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
