import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
