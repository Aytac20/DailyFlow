import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TasksScreen from "./screens/TasksScreen";
import PrivateRoute from "./component/PrivateRoute";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} element={<TasksScreen />} />
      </Route>

      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
