import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import * as converter from "./converter";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import MainError from "./components/MainError";

const App = () => {
  const [canRender, setCanRender] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    converter
      .init()
      .then(() => setCanRender(true))
      .catch((err) => {
        console.error(err);

        if (err && typeof err.toString === "function") {
          setError(err.toString());
        } else {
          setError(JSON.stringify(err));
        }
      });
  }, []);

  if (!canRender && !error) {
    return (
      <div className="loader_wrapper">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <MainError error={error} />;
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
