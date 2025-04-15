import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Partner from "./pages/Partner";
import ProtectedLayout from "./layout/ProtectedLayout";
import Admin from "./pages/admin/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Admin />,
      },

      {
        path: "partner",
        element: <Partner />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
