import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

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

  return canRender ? <Main /> : <span>Loading...</span>;
};

export default App;
