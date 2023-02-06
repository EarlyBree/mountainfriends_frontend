import React from "react";

import Button from "../UI/Button/Button";
import classes from "./FriendCard.module.css";

const FriendCard = (props) => {
  const addFriend = () => {
    props.addFriend(props.id);
  };

  return (
    <li className={classes.onefriend}>
      <div>
        {/* <p>{props.key}</p> */}
        {/* <input hidden value={props.id} /> */}
        <h3>{props.name}</h3>
        <p>{props.email}</p>
        <p>{props.birthday.split("T")[0]}</p>
        <p>{props.city}</p>
        {props.isFriend === 0 && (
          <Button onClick={addFriend}>{props.button}</Button>
        )}
        {props.isFriend === 1 && <Button disabled>{props.button}</Button>}
      </div>
    </li>
  );
};

export default FriendCard;
