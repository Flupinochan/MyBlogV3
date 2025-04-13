import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import Loading from "./layouts/loading/Loading.tsx";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./index.module.css";
import Home from "./features/home/Home.tsx";
import Tool from "./features/tool/Tool.tsx";
import Error from "./layouts/error/Error.tsx";
import { Notifications } from '@mantine/notifications';
import SwaggerUi from "./features/tool/components/swagger/SwaggerUi.tsx";
import History from "./features/history/History.tsx";


const theme = createTheme({
  fontFamily: 'Noto Sans JP',
  primaryColor: "violet",
  colors: {
    dark: ["#ECEDEE", "#CCCECF", "#ACAEB1", "#8C8F92", "#6D6F73", "#4D5054", "#2D3036", "#0d1117", "#111316", "#141414"],
    grape: ["#f8f0fc", "#f3e5fa", "#e9d9f8", "#e0cdf7", "#d6c1f5", "#ccc5f4", "#c2a9f2", "#7828C8", "#8c3cd0", "#862e9c"]
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

// 1秒ローディング画面の表示
// const LazyApp = lazy(() =>
//   new Promise<{ default: React.ComponentType }>((resolve) => {
//     setTimeout(() => {
//       resolve({ default: App });
//     }, 1000);
//   })
// );

// React Router Dom (React Routerはサーバーサイド用)
// index: trueがOutletに表示されるデフォルトのページ
// / にアクセスすれば、 Homeが表示
// /tool にアクセスすれば、Toolが表示
// /abcde などの存在しないパスの場合は、Homeにリダイレクト
// errorElementでエラー時のページ遷移設定
const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { index: true, element: <Home />, errorElement: <Error /> },
      { path: "tool", element: <Tool />, errorElement: <Navigate to="/" replace /> },
      { path: "tool/swagger-ui", element: <SwaggerUi />, errorElement: <Navigate to="/" replace /> },
      { path: "history", element: <History />, errorElement: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <Notifications />
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  </MantineProvider>
);
