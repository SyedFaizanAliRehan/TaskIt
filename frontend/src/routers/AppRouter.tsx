import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Root } from "../pages/Root/Root";
import Dashboard from "../pages/Dashboard/Dashboard";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RouteAuthenticate } from "../utils/RouteAuthenticate/RouteAuthenticate";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteAuthenticate>
        <Root />
      </RouteAuthenticate>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
