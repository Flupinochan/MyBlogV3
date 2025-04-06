import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@mantine/core/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createTheme, MantineProvider, rem } from '@mantine/core';
import Loading from "./layouts/loading/Loading.tsx";

const theme = createTheme({
  // spacing:
  // lineHeights:
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
  primaryColor: "violet",
  colors: {
    dark: ["#ECEDEE", "#CCCECF", "#ACAEB1", "#8C8F92", "#6D6F73", "#4D5054", "#2D3036", "#0d1117", "#111316", "#141414"]
  },
  autoContrast: true,
  fontFamily: 'Montserrat, sans-serif',
  focusRing: "auto",
  defaultRadius: "xs",
  cursorType: "pointer",
  primaryShade: 9,
  headings: {
    sizes: {
      h1: {
        fontSize: rem(36)
      }
    }
  },
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
    }, 3000); // 2秒待機
  });
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        {/* <App /> */}
        <LazyApp />
      </Suspense>
    </React.StrictMode>
  </MantineProvider>
);
