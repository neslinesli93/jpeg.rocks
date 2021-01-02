import { h } from "preact";

const Header = () => {
  return (
    <header>
      <h1>Privacy-aware JPEG optimizer</h1>

      <p>
        The images you upload <u>never</u> leave your device: all the processing
        is done entirely in the browser
      </p>
    </header>
  );
};

export default Header;
