import React from "react";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
        {!props.isLoggedIn && (
          <li>
            <button onClick={props.toRegister}>Register now!</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
