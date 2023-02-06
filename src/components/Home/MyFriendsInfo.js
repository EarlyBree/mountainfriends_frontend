import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import FriendCard from "./FriendCard";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./MyFriendsInfo.module.css";

const MyFriendsInfo = () => {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [friendAdded, setFriendAdded] = useState(false);
  useEffect(() => {
    const fetchAllFriendsId = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("isLoggedIn"),
        }),
      };
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getallmyfriendsid",
          reqOptions
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const body = await response.json();
        setAllMyFriends(body);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllFriendsId();
  }, [friendAdded]);

  const deleteFriend = async (friendsId) => {
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
        "https://mountainfriends-backend.onrender.com/deleteafriend",
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

  const allFriendsCard = allMyFriends.map((friend) => (
    <FriendCard
      key={friend.id}
      id={friend.id}
      name={friend.name}
      email={friend.email}
      birthday={friend.birthday}
      city={friend.city}
      button={"Delete friend"}
      isFriend={0}
      addFriend={deleteFriend}
    />
  ));

  return (
    <Card className={classes.friendsinfo}>
      <h1>My friends</h1>
      <ul className={classes.friendlist}>{allFriendsCard}</ul>
      {friendAdded && (
        <Modal>
          <div className={classes.modal}>
            <h1>Friend deleted!</h1>
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

export default MyFriendsInfo;
