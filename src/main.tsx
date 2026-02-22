import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

if (import.meta.env.DEV) {
  import("./wdyr");
  import("react-scan").then(({ scan }) => {
    scan({ enabled: true });
  });

  import("@axe-core/react").then((axe) => {
    import("react-dom").then((ReactDOM) => {
      axe.default(React, ReactDOM, 1000);
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
