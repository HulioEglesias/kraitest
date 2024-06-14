import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

import "./header.scss";

const Header = () => {
  return (
    <header>
      <div className="headerLogoTitle">
        <Image src={logo} alt="logo" />
        <span className="title">Gamer title</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/game">Game</Link>
          </li>
          <li>
            <Link href="/feedback">Feedback</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
