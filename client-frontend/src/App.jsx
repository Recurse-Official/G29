import React, { useState } from "react";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Questions from "./pages/questions";

const App = () => {
  const [currentPage, setCurrentPage] = useState("registration");

  const handleRegistrationSuccess = () => {
    setCurrentPage("login");
  };

  const handleLoginSuccess = () => {
    setCurrentPage("questions");
  };

  return (
    <div>
      {currentPage === "registration" && (
        <Registration onRegistrationSuccess={handleRegistrationSuccess} />
      )}
      {currentPage === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "questions" && <Questions />}
    </div>
  );
};

export default App;
