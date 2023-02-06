import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("isLoggedIn"),
        }),
      };
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getuserbyid",
          reqOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const body = await response.json();
        setUserName(body.name);
        setUserEmail(body.email);
        setUserCity(body.city);
        setUserBirthday(body.birthday.split("T")[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Card className={classes.profileinfo}>
      <h1>My Profile</h1>
      <div className={classes.profilecard}>
        <p>Name: {userName}</p>
        <p>Email: {userEmail}</p>
        <p>Birthday: {userBirthday}</p>
        <p>City: {userCity}</p>
      </div>
    </Card>
  );
};

export default ProfileInfo;
