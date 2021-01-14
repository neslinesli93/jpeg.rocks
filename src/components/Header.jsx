import { h } from "preact";
import { Link } from "preact-router/match";

function getTheme() {
  if (
    typeof window !== "undefined" &&
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
          <img alt="JPEG.rocks" src={getTheme()} class="logo" />
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
