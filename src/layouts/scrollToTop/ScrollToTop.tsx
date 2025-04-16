import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  // ページ遷移時にスクロールバーをTopに戻す
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};
