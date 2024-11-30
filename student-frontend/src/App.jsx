import React, { useState } from "react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import StudentUI from "./pages/Studentui";

const App = () => {
  const [currentPage, setCurrentPage] = useState("registration");

  
  const handleRegistrationSuccess = () => {
    setCurrentPage("login");
  };

 
  const handleLoginSuccess = () => {
    setCurrentPage("studentUI");
  };

  return (
    <div>
      {currentPage === "registration" && (
        <Registration onRegistrationSuccess={handleRegistrationSuccess} />
      )}
      {currentPage === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "studentUI" && <StudentUI />}
    </div>
  );
};

export default App;
