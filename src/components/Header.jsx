import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

import lightLogo from "../assets/images/logo_light_mode.png";
import darkLogo from "../assets/images/logo_dark_mode.png";

function getLogoByTheme() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return darkLogo;
  }

  return lightLogo;
}

const Header = () => {
  const [logo, setLogo] = useState(lightLogo);

  useEffect(() => {
    setLogo(getLogoByTheme());
  }, []);

  return (
    <header>
      <nav>
        <a href="/">
          <img alt="JPEG.rocks" src={logo} class="logo" />
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
