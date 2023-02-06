import React, { useState, useEffect } from "react";

import FriendCard from "./FriendCard";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./AllFriendsInfo.module.css";

const AllFriendsInfo = () => {
  const [allFriends, setAllFriends] = useState([]);
  const [friendAdded, setFriendAdded] = useState(false);
  useEffect(() => {
    const fetchAllFriends = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("isLoggedIn"),
        }),
      };
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getallusers",
          reqOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const body = await response.json();
        setAllFriends(body);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllFriends();
  }, [friendAdded]);

  const addFriend = async (friendsId) => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("isLoggedIn"),
        friendsId: friendsId,
      }),
    };
    try {
      const response = await fetch(
        "https://mountainfriends-backend.onrender.com/addafriend",
        reqOptions
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong");
      }
      // const body = await response.json();
      // setAllFriends(body);
      setFriendAdded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmFriendAddedHandler = () => {
    setFriendAdded(false);
  };

  const allFriendsCard = allFriends.map((friend) => (
    <FriendCard
      key={friend.id}
      id={friend.id}
      name={friend.name}
      email={friend.email}
      birthday={friend.birthday}
      city={friend.city}
      button={"Add friend"}
      isFriend={friend.isFriend}
      addFriend={addFriend}
    />
  ));
  return (
    <Card className={classes.friendsinfo}>
      <h1>All people</h1>
      <ul className={classes.friendlist}>{allFriendsCard}</ul>
      {friendAdded && (
        <Modal>
          <div className={classes.modal}>
            <h1>Friend added!</h1>
            <form onSubmit={confirmFriendAddedHandler}>
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

export default AllFriendsInfo;
