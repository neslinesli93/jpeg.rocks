import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import * as converter from "./converter";
import { humanFileSize, readFileAsync } from "./utils";

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

  const onChange = (evt) => {
    const file = evt.target.files[0];
    console.log(`Initial size: ${humanFileSize(file.size)}`);

    readFileAsync(file)
      .then((contentBuffer) => {
        return converter.convert(contentBuffer);
      })
      .then(({ resultData, resultSize }) => {
        console.log(`Final size: ${humanFileSize(resultSize)}`);

        const blob = new Blob([resultData], { type: "image/jpeg" });
        const image = new Image();
        image.src = URL.createObjectURL(blob);
        document.body.appendChild(image);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!canRender) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
};

export default App;
