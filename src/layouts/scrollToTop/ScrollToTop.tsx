import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// useEffectでページ遷移時の処理を追加するだけのコンポーネント
export const ScrollToTop = () => {
  const location = useLocation();

  // ページ遷移時にスクロールバーをTopに戻す
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // UI表示機能なし
  return null;
};
