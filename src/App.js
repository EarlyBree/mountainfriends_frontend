import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/register/Register";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toRegister, setToRegister] = useState(false);

  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedIn >= parseInt("1")) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (id, email, password) => {
    localStorage.setItem("isLoggedIn", id);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const registerHandler = () => {
    setToRegister(true);
    setIsLoggedIn(null);
  };

  const noMoreRegister = () => {
    setToRegister(false);
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
        toRegister={registerHandler}
      />
      <main>
        {isLoggedIn === false && (
          <Login onLogin={loginHandler} toRegister={registerHandler} />
        )}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {toRegister && <Register outRegister={noMoreRegister} />}
      </main>
    </React.Fragment>
  );
}

export default App;
