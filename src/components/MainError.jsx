import { h } from "preact";

const MainError = ({ error }) => {
  return (
    <main>
      <h2 className="text-center">The app could not be initialized properly</h2>
      <p>
        Please try to reload the page. If this keeps happening, you may need a
        modern browser that supports{" "}
        <a href="https://webassembly.org/">WebAssembly</a>.
      </p>

      <p>
        If you like, you may{" "}
        <a href="https://github.com/neslinesli93/jpeg.rocks/issues/new">
          report an issue
        </a>
        , but remember to include the following error message:
        <pre>
          <code>{error}</code>
        </pre>
      </p>
    </main>
  );
};

export default MainError;
