import { createBrowserRouter } from "react-router-dom";
import Register from "../register";
import App from "../App";

export const rooter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
