import { createBrowserRouter } from "react-router-dom";
import { RawAudio } from "./pages";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/raw",
    Component: RawAudio,
  },
  {
    path: "/",
    Component: App,
  },
]);
