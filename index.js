import React from "react";
import ReactDOM from "react-dom/client";

import store from "./src/store/store";
import { RouterProvider } from "react-router";
import { appRouter } from "./src/App";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
