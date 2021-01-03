import { h } from "preact";
import { useState } from "preact/hooks";
import { v4 as uuidv4 } from "uuid";

import DropArea from "./DropArea";
import Files from "./Files";
import * as converter from "../converter";
import detectOrientation from "../utils/detect-image-orientation";
import generateZip from "../utils/generate-zip";
import readFileAsync from "../utils/read-file-async";

class CustomFile {
  constructor(rawFile) {
    // initial props
    this.id = uuidv4();
    this.name = rawFile.name;
    this.initialSize = rawFile.size;
    this.valid = rawFile.type === "image/jpeg";
    this.rawFile = rawFile;

    // result props
    this.loading = this.valid;
    this.error = null;
    this.finalSize = null;
    this.src = null;
    this.blob = null;
  }
}

async function processFile(file) {
  const contentBuffer = await readFileAsync(file.rawFile);
  const orientation = detectOrientation(contentBuffer);

  const { resultData, resultSize } = await converter.convert(
    contentBuffer,
    orientation
  );

  return { resultData, resultSize };
}

const Main = () => {
  const [files, setFiles] = useState([]);

  const processFiles = (files) => {
    const inputFiles = Array.from(files).map((f) => new CustomFile(f));
    setFiles((prev) => prev.concat(inputFiles));

    inputFiles
      .filter((f) => f.valid)
      .forEach((file) => {
        processFile(file)
          .then(({ resultData, resultSize }) => {
            setFiles((prev) =>
              prev.map((f) => {
                if (f.id === file.id) {
                  const blob = new Blob([resultData], { type: "image/jpeg" });
                  const url = URL.createObjectURL(blob);

                  return {
                    ...f,
                    blob,
                    finalSize: resultSize,
                    src: url,
                    loading: false,
                  };
                }

                return f;
              })
            );
          })
          .catch((err) => {
            setFiles((prev) =>
              prev.map((f) => {
                if (f.id === file.id) {
                  return { ...f, error: err, loading: false };
                }

                return f;
              })
            );
          });
      });
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const downloadAllFiles = () => {
    generateZip(files.filter((f) => f.blob));
  };

  return (
    <main>
      <section>
        <DropArea onFilesSelect={processFiles} />
      </section>

      {files.length > 0 && <hr />}

      {files.length > 0 && (
        <section>
          <button onClick={clearAllFiles}>Clear all</button>
          <button onClick={downloadAllFiles}>Download all files</button>
        </section>
      )}

      <section className="files__wrapper">
        <Files files={files} />
      </section>
    </main>
  );
};

export default Main;
