import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./component/privateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewUser from "./pages/NewUser";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="newuser"
          element={
            <AuthProvider>
              <NewUser />
            </AuthProvider>
          }
        />
        <Route
          path="/"
          element={
            <AuthProvider>
              <RequireAuth>
                <App />
              </RequireAuth>
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
