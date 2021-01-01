import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { v4 as uuidv4 } from "uuid";

import { humanFileSize, readFileAsync } from "../utils";
import * as converter from "../converter";

class CustomFile {
  constructor(rawFile) {
    // initial props
    this.id = uuidv4();
    this.name = rawFile.name;
    this.initialSize = rawFile.size;
    this.valid = rawFile.type === "image/jpeg";
    this.rawFile = rawFile;

    // result props
    this.finalSize = null;
    this.src = null;
  }
}

async function processFile(file) {
  const contentBuffer = await readFileAsync(file.rawFile);
  const result = await converter.convert(contentBuffer);
  return result;
}

const Main = () => {
  const [files, setFiles] = useState([]);

  const onChange = (evt) => {
    const inputFiles = Array.from(evt.target.files).map(
      (f) => new CustomFile(f)
    );
    setFiles(inputFiles);

    inputFiles.forEach((file) => {
      processFile(file).then(({ resultData, resultSize }) => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === file.id) {
              const blob = new Blob([resultData], { type: "image/jpeg" });
              const url = URL.createObjectURL(blob);
              return { ...f, finalSize: resultSize, src: url };
            } else {
              return f;
            }
          })
        );
      });
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={onChange} />

      <div>
        <span>Results</span>
      </div>

      {files.map((file) => {
        if (file.valid && file.src) {
          return (
            <div key={file.id}>
              <span>
                <b>{file.name}</b> Initial size:{" "}
                {humanFileSize(file.initialSize)}
              </span>

              {file.src && <img className="small" src={file.src} />}

              <span>Final size: {humanFileSize(file.finalSize)}</span>
            </div>
          );
        } else {
          return (
            <div key={file.id}>
              <span>Invalid file: {file.name}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Main;
