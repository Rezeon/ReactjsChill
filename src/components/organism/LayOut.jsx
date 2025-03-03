import { Outlet } from "react-router-dom";
import HeaderPage from "./HeaderPage";
import FooterPage from "./FooterPage";

function Layout() {
  return (
    <>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </>
  );
}

export default Layout;