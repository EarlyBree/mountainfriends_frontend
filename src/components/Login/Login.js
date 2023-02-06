import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 3 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 3 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailState.value,
        password: passwordState.value,
      }),
    };
    try {
      const response = await fetch(
        "https://mountainfriends-backend.onrender.com/checkpassword",
        reqOptions
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      // console.log(response);
      const body = await response.json();
      console.log(body.answer);
      if (body.answer === "okay") {
        props.onLogin(body.id, emailState.value, passwordState.value);
      } else if (body.answer === "noUser") {
        setIsPasswordWrong("noUser");
      } else if (body.answer === "wrongPassword") {
        setIsPasswordWrong("wrongPassword");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isPasswordWrongHandler = () => {
    setIsPasswordWrong(false);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
      {isPasswordWrong && (
        <Modal>
          <div className={classes.modal}>
            {isPasswordWrong === "noUser" && <h1>No such user!</h1>}
            {isPasswordWrong === "wrongPassword" && <h1>Wrong password!</h1>}
            {isPasswordWrong === "noUser" && (
              <form onSubmit={props.toRegister}>
                <Button className={classes.modalBtn} type="submit">
                  Register now!
                </Button>
              </form>
            )}
            <form onSubmit={isPasswordWrongHandler}>
              <Button type="submit" className={classes.modalBtn}>
                Okay
              </Button>
            </form>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default Login;
