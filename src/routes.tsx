import { RouteObject } from "react-router-dom";
import Home from "@/pages/home/home";
import Admin from "./pages/admin/admin";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
];

export default routes;
