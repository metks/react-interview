import { ReactNode } from "react";
import Header from "../header/Header";
import "./layout.css"; // Assuming you have a CSS file for layout styles

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactNode => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
