import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import classes from "./Register.module.css";

const Register = (props) => {
  const [enteredName, setEnterName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredBirthday, setEnteredBirthday] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const nameIsValid = enteredName.trim() !== "";
  const emailIsValid = enteredEmail.includes("@") && enteredEmail.includes(".");
  const passwordIsValid = enteredPassword.trim().length > 3;
  const cityIsValid = enteredCity.trim() !== "";
  const birthdayIsValid = isNaN(enteredBirthday);

  useEffect(() => {
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      cityIsValid &&
      birthdayIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    nameIsValid,
    emailIsValid,
    passwordIsValid,
    cityIsValid,
    birthdayIsValid,
  ]);

  const nameInputChangeHandler = (event) => {
    setEnterName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const cityInputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };
  const birthdayInputChangeHandler = (event) => {
    setEnteredBirthday(event.target.value);
  };

  const outRegister = () => {
    props.outRegister();
    setShowModal(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        birthday: enteredBirthday,
        city: enteredCity,
      }),
    };
    try {
      const response = await fetch(
        "https://mountainfriends-backend.onrender.com/register",
        reqOptions
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setShowModal(true);
      // console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card className={classes.register}>
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        <div className={classes["form-control"]}>
          <label>Name:</label>
          <input type="text" onChange={nameInputChangeHandler} />
        </div>
        <div className={classes["form-control"]}>
          <label>Email:</label>
          <input type="email" onChange={emailInputChangeHandler} />
        </div>
        <div className={classes["form-control"]}>
          <label>Password: 4 chars minimum </label>
          <input type="text" onChange={passwordInputChangeHandler} />
        </div>
        <div className={classes["form-control"]}>
          <label>City:</label>
          <input type="text" onChange={cityInputChangeHandler} />
        </div>
        <div className={classes["form-control"]}>
          <label>Birthday:</label>
          <input type="date" onChange={birthdayInputChangeHandler} />
        </div>
        <div className={classes["form-actions"]}>
          <Button onClick={outRegister}>Back</Button>
          <Button
            disabled={!formIsValid}
            className={classes.mybutton}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      {showModal && (
        <Modal>
          <div className={classes.mymodal}>
            <h1>Welcome to mountain friends!</h1>
            <h2>Thank you for register!</h2>
            <Button onClick={outRegister}>Login now!</Button>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default Register;
