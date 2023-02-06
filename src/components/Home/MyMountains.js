import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import HikeDetails from "./HikeDetails";
import TourFilter from "./ChartBar/TourFilter";
import TourChart from "./ChartBar/TourChart";
import classes from "./MyMountains.module.css";

const MyMountains = () => {
  const [myHikes, setMyHikes] = useState([]);
  const [filteredYear, setFilteredYear] = useState("2022");
  useEffect(() => {
    const fetchMyMountains = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("isLoggedIn"),
        }),
      };
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getallhikes",
          reqOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        // let body = JSON.parse(JSON.stringify(response));
        const body = await response.json();
        // console.log(body);
        setMyHikes(body);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMyMountains();
  }, []);

  const filteredChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredHikes = myHikes.filter((hike) => {
    // console.log(hike.date.split("-")[0]);
    return hike.date.split("-")[0] === filteredYear;
  });

  // console.log(filteredHikes);

  const allMyHikesCard = myHikes.map((hike) => (
    <HikeDetails
      key={hike.id}
      id={hike.id}
      date={hike.date}
      name={hike.mountain.name}
      difference={hike.mountain.difference}
      altitude={hike.mountain.altitude}
    />
  ));

  return (
    <Card className={classes.mountainsinfo}>
      <h1>My mountains</h1>
      <TourFilter
        selected={filteredYear}
        onChangeFilter={filteredChangeHandler}
      />
      <TourChart className={classes.tourchart} hikes={filteredHikes} />
      <ul>{allMyHikesCard}</ul>
    </Card>
  );
};

export default MyMountains;
