import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninScreen from "./presentation/screens/signinScreen/signinScreen";
import SignupScreen from "./presentation/screens/signupScreen/signupScreen";
import ApplicationScreen from "./presentation/screens/application";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SigninScreen />,
    errorElement: <>404 Not Found</>,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
    errorElement: <>404 Not Found</>,
  },
  {
    path: "/application",
    element: <ApplicationScreen />,
    errorElement: <>404 Not Found</>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
reportWebVitals();
