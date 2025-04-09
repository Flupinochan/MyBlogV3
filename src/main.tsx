import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import Loading from "./layouts/loading/Loading.tsx";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./index.css";
import Home from "./features/home/Home.tsx";
import Tool from "./features/Tool/Tool.tsx";
import Error from "./layouts/error/Error.tsx";

const theme = createTheme({
  primaryColor: "violet",
  colors: {
    dark: ["#ECEDEE", "#CCCECF", "#ACAEB1", "#8C8F92", "#6D6F73", "#4D5054", "#2D3036", "#0d1117", "#111316", "#141414"]
  },
  autoContrast: true,
  focusRing: "auto",
  defaultRadius: "xs",
  cursorType: "pointer",
  primaryShade: 9,
  components: {
    Button: {
      defaultProps: {
        variant: 'outline',
      },
    },
  },
});

Amplify.configure(outputs);

// ローディング画面テスト用遅延コンポーネント
const LazyApp = lazy(() => {
  // ここで意図的に遅延を加える
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./App.tsx'));
    }, 3000);
    // 2秒待機
  });
});

// React Router Dom (React Routerはサーバーサイド用)
// index: trueがOutletに表示されるデフォルトのページ
// / にアクセスすれば、 Homeが表示
// /tool にアクセスすれば、Toolが表示
// /abcde などの存在しないパスの場合は、Homeにリダイレクト
// errorElementでエラー時のページ遷移設定
const router = createBrowserRouter([
  {
    path: "/", element: <LazyApp />,
    children: [
      { index: true, element: <Home />, errorElement: <Error /> },
      { path: "tool", element: <Tool />, errorElement: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  </MantineProvider>
);
