import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Menu from "./layouts/menu/Menu";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.stickyHeader}>
        <Header />
        <Menu />
      </div>
      {/* Outletにルーティングされたページが表示 */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
