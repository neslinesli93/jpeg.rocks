import { h } from "preact";
import { Link } from "preact-router/match";

import logoLightMode from "../assets/images/logo_light_mode.png";
import logoDarkMode from "../assets/images/logo_dark_mode.png";

function getLogo() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return logoDarkMode;
  }

  return logoLightMode;
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
            <Link href="/about" activeClassName="active">
              About
            </Link>
          </li>

          <li>
            <a
              href="https://github.com/neslinesli93/jpeg.rocks"
              target="_blank"
              rel="noreferrer"
              native
            >
              Source ➚
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
