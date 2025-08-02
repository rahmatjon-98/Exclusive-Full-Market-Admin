import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../features/store/store.js";
import { ThemeProvider } from "next-themes";
import "../../i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
        >
          <Suspense fallback="loading">
            <App />
          </Suspense>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
