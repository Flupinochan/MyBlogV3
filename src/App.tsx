import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import Menu from "./layouts/menu/Menu";

function App() {

  return (
    <>
      <Header />
      <Menu />
      {/* Outletにルーティングされたページが表示 */}
      <Outlet />
      <footer>footer</footer>
    </>
  );
}

export default App;
