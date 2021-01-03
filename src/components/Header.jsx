import { h } from "preact";

function getLogo() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "/assets/images/logo_dark_mode.png";
  }

  return "/assets/images/logo_light_mode.png";
}

const Header = () => {
  return (
    <header>
      <nav>
        <a href="/">
          <img alt="JPEG.rocks" src={getLogo()} class="logo" />
        </a>

        <ul>
          <li>
            <a
              href="https://github.com/neslinesli93/jpeg.rocks"
              target="_blank"
              rel="noreferrer"
            >
              About
            </a>
          </li>
        </ul>
      </nav>

      <h1 className="text-center">Privacy-aware JPEG optimizer</h1>

      <p className="text-center">
        The images you upload <u>never</u> leave your device: all the processing
        is done entirely in the browser
      </p>
    </header>
  );
};

export default Header;
