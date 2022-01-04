import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreProvider } from "./contexts/StoreContext";
import { RequireAuth } from "./component/privateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewUser from "./pages/NewUser";
import Home from "./pages/Home";
import About from "./pages/About";

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
        >
          <Route
            path="/"
            element={
              <StoreProvider>
                <Home />
              </StoreProvider>
            }
          />
          <Route
            path="home"
            element={
              <StoreProvider>
                <Home />
              </StoreProvider>
            }
          />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
