import React from "react";

import Card from "../UI/Card/Card";
import classes from "./HikeDetails.module.css";

const HikeDetails = (props) => {
  return (
    <li>
      <Card className={classes.details}>
        {/* <h1>{props.id}</h1> */}
        <p className={classes.name}>Mountain: {props.name}</p>
        <p className={classes.altitude}>
          Altitude difference: {props.difference}m
        </p>
        <p className={classes.date}>Date: {props.date.split("T")[0]}</p>
      </Card>
    </li>
  );
};

export default HikeDetails;
