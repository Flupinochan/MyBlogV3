import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import Menu from "./layouts/menu/Menu";
import "./App.css";

function App() {

  return (
    <>
      <div className="sticky-header">
        <Header />
        <Menu />
      </div>
      {/* Outletにルーティングされたページが表示 */}
      <Outlet />
      <footer>footer</footer>
    </>
  );
}

export default App;
