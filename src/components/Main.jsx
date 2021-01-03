import { h } from "preact";
import { useState } from "preact/hooks";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

import humanFileSize from "../utils/human-file-size";
import readFileAsync from "../utils/read-file-async";
import detectOrientation from "../utils/detect-image-orientation";
import * as converter from "../converter";

function reductionPercentage(file) {
  const result = ((file.initialSize - file.finalSize) * 100) / file.initialSize;
  return result.toFixed(1);
}

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
  const [dragTarget, setDragTarget] = useState(null);
  const [dragging, setDragging] = useState(false);
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

  const stopBrowserDefaultBehaviour = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragOn = (e) => {
    stopBrowserDefaultBehaviour(e);
    if (!dragging) {
      setDragging(true);
    }

    setDragTarget(e.target);
  };

  const dragOff = (e) => {
    stopBrowserDefaultBehaviour(e);
    if (dragging && e.target == dragTarget) {
      setDragging(false);
    }
  };

  const onDrop = (e) => {
    stopBrowserDefaultBehaviour(e);
    setDragging(false);

    processFiles(e.dataTransfer.files);
  };

  return (
    <main>
      <section>
        <div
          className={classNames({ box: true, box__dragging: dragging })}
          ondrag={(e) => stopBrowserDefaultBehaviour(e)}
          onDragStart={(e) => stopBrowserDefaultBehaviour(e)}
          onDragOver={(e) => stopBrowserDefaultBehaviour(e)}
          onDragEnd={(e) => stopBrowserDefaultBehaviour(e)}
          onDragEnter={(e) => dragOn(e)}
          onDragLeave={(e) => dragOff(e)}
          onDrop={(e) => onDrop(e)}
        >
          <div className="box__input">
            <input
              id="droparea"
              type="file"
              onChange={(e) => processFiles(e.target.files)}
              accept="image/jpeg"
              className="box__file"
              multiple
            />
            <label for="droparea" className="box__label">
              <strong className="box__click_upload">Choose your files</strong>
              <span className="box__dragndrop"> or drag them here</span>
            </label>
          </div>
        </div>
      </section>

      {files.length > 0 && <hr />}

      <section className="files__wrapper">
        <table>
          <tbody>
            {files.map((file) => {
              return (
                <tr key={file.id}>
                  <td>
                    <div>
                      {file.src && (
                        <div>
                          <img src={file.src} />
                        </div>
                      )}

                      {file.loading && (
                        <div className="sk-cube-grid">
                          <div className="sk-cube sk-cube1"></div>
                          <div className="sk-cube sk-cube2"></div>
                          <div className="sk-cube sk-cube3"></div>
                          <div className="sk-cube sk-cube4"></div>
                          <div className="sk-cube sk-cube5"></div>
                          <div className="sk-cube sk-cube6"></div>
                          <div className="sk-cube sk-cube7"></div>
                          <div className="sk-cube sk-cube8"></div>
                          <div className="sk-cube sk-cube9"></div>
                        </div>
                      )}

                      <small className="text-cut">
                        <i>{file.name}</i>
                      </small>
                    </div>
                  </td>

                  <td>
                    {!file.valid && (
                      <span className="alert">File not supported</span>
                    )}

                    {file.error && (
                      <span className="alert">
                        Error while processing the file
                      </span>
                    )}

                    {file.valid && file.finalSize && (
                      <span>
                        {humanFileSize(file.initialSize)} ➜{" "}
                        {humanFileSize(file.finalSize)}{" "}
                        <b>(-{reductionPercentage(file)}%)</b>
                      </span>
                    )}
                  </td>

                  <td className="text-right">
                    {file.src && (
                      <a href={file.src} download={file.name}>
                        Download
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Main;
