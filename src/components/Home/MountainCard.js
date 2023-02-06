import React from "react";

import Button from "../UI/Button/Button";
import classes from "./MountainCard.module.css";

const MountainCard = (props) => {
  const showDetails = () => {
    props.onShowDetails(props.id);
  };

  return (
    <li className={classes.onemountain}>
      <div>
        <h2>{props.name}</h2>
        <h4>{props.altitude}m</h4>
        <Button onClick={showDetails} id={props.id}>
          Details
        </Button>
      </div>
    </li>
  );
};

export default MountainCard;
