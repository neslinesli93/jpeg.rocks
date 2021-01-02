import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import Header from "./components/Header";
import Main from "./components/Main";
import * as converter from "./converter";

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
    return <span>Loading...</span>;
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
