import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import classes from "./MountainDetails.module.css";

const MountainDetails = (props) => {
  const [addHike, setAddHike] = useState(false);
  const [changedDate, setChangedDate] = useState(false);
  const [enteredDate, setEnteredDate] = useState("");
  const [allPeopleOnTheMountain, setAllPeopleOnTheMountain] = useState([]);
  const goBack = () => {
    props.onBack();
  };

  const addHikeHandler = () => {
    setAddHike(true);
  };

  const noAdding = () => {
    setEnteredDate("");
    setChangedDate(false);
    setAddHike(false);
  };

  const changeDateHandler = (event) => {
    setChangedDate(true);
    setEnteredDate(event.target.value);
  };

  const writeHikeHandler = async () => {
    const date = enteredDate.toString();
    // console.log(date);
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("isLoggedIn"),
        mountain: props.id,
        date: date,
      }),
    };
    try {
      const response = await fetch(
        "https://mountainfriends-backend.onrender.com/addhike",
        reqOptions
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong");
      }
      setAddHike(false);
      setChangedDate(false);
      setEnteredDate("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getAllHikers = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("isLoggedIn"),
          mountain: props.id,
        }),
      };
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getallhikers",
          reqOptions
        );
        if (!response.ok) {
          console.log(response);
          throw new Error("Something went wrong");
        }
        const body = await response.json();
        console.log(body);
        setAllPeopleOnTheMountain(body);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllHikers();
  }, [props.id]);

  const peopleOnTheMountainLi = allPeopleOnTheMountain.map((item) => (
    <li key={item}>{item}</li>
  ));

  return (
    <Card className={classes.details}>
      <div>
        <h2>Mountain details for {props.name}</h2>
        <p>Altitude: {props.altitude} m</p>
        <p>Height difference: {props.difference} m</p>
        <p>Longitude: {props.longitude} km</p>
        <p>Duration: {props.duration} hours</p>
        {allPeopleOnTheMountain.length > 0 && (
          <div className={classes.peoplediv}>
            <h2>People who have been on this mountain</h2>
            <ul>{peopleOnTheMountainLi}</ul>
          </div>
        )}
        <Button className={classes.detailsbutton1} onClick={goBack}>
          Back
        </Button>
        <Button className={classes.detailsbutton2} onClick={addHikeHandler}>
          Add tour to my list
        </Button>
      </div>
      {addHike && (
        <Modal className={classes.mymodal}>
          <h1 className={classes.myh1}>
            Do want to add {props.name} to your hike list?
          </h1>
          <p className={classes.myp}>Choose a date</p>
          <input
            className={classes.myinput}
            type="date"
            id="newDate"
            name="newDate"
            min="2020-01-01"
            value={enteredDate}
            onChange={changeDateHandler}
          />
          <div className={classes.buttondiv}>
            <Button onClick={noAdding}>Back</Button>
            {changedDate && (
              <Button onClick={writeHikeHandler}>Add hike</Button>
            )}
            {!changedDate && <Button disabled>Add hike</Button>}
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default MountainDetails;
