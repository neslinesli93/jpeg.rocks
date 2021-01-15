import { h } from "preact";

import Loader from "./Loader";
import humanFileSize from "../utils/human-file-size";

function reductionPercentage(file) {
  const result = ((file.initialSize - file.finalSize) * 100) / file.initialSize;

  let sign = "-";
  if (result < 0) {
    sign = "+";
  }
  return `${sign}${Math.abs(result.toFixed(1))}`;
}

const Files = ({ files, previewEnabled }) => {
  return (
    <table>
      <tbody>
        {files.map((file) => {
          return (
            <tr key={file.id}>
              <td>
                <div className="text-cut">
                  {previewEnabled && (
                    <>
                      {file.src && (
                        <div>
                          <a
                            href={file.src}
                            target="_blank"
                            title="Open preview"
                          >
                            <img src={file.src} alt={file.name} />
                          </a>
                        </div>
                      )}

                      {file.loading && <Loader />}
                    </>
                  )}

                  <small>
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
                    <b>({reductionPercentage(file)}%)</b>
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
