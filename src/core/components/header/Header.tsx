import { ReactNode } from "react";
import "./header.css";
import logo from "../../../assets/logo.png";

const Header = (): ReactNode => {
  return (
    <header>
      <div className="header">
        <img src={logo} alt="Logo" />
        <p>List APP</p>
      </div>
    </header>
  );
};

export default Header;
