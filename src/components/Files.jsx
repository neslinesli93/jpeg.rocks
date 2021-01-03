import { h } from "preact";

import humanFileSize from "../utils/human-file-size";

function reductionPercentage(file) {
  const result = ((file.initialSize - file.finalSize) * 100) / file.initialSize;
  return result.toFixed(1);
}

const Files = ({ files, previewEnabled }) => {
  return (
    <table>
      <tbody>
        {files.map((file) => {
          return (
            <tr key={file.id}>
              <td>
                <div>
                  {previewEnabled && (
                    <>
                      {file.src && (
                        <div>
                          <img src={file.src} />
                        </div>
                      )}

                      {file.loading && (
                        <div className="sk-cube-grid">
                          <div className="sk-cube sk-cube1" />
                          <div className="sk-cube sk-cube2" />
                          <div className="sk-cube sk-cube3" />
                          <div className="sk-cube sk-cube4" />
                          <div className="sk-cube sk-cube5" />
                          <div className="sk-cube sk-cube6" />
                          <div className="sk-cube sk-cube7" />
                          <div className="sk-cube sk-cube8" />
                          <div className="sk-cube sk-cube9" />
                        </div>
                      )}
                    </>
                  )}

                  <small className="text-cut">
                    <i>{file.name}</i>
                  </small>
                </div>
              </td>

              <td>
                {!previewEnabled && file.loading && <progress />}

                {!file.valid && (
                  <span className="alert">File not supported</span>
                )}

                {file.error && (
                  <span className="alert">Error while processing the file</span>
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
  );
};

export default Files;
