import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./component/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
