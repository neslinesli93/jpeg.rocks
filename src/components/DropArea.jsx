import { h } from "preact";
import { useState } from "preact/hooks";
import classNames from "classnames";

const DropArea = ({ onFilesSelect }) => {
  const [dragTarget, setDragTarget] = useState(null);
  const [dragging, setDragging] = useState(false);

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

    onFilesSelect(e.dataTransfer.files);
  };

  return (
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
          onChange={(e) => onFilesSelect(e.target.files)}
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
  );
};

export default DropArea;
