import React, { useState } from "react";

import Card from "../UI/Card/Card";
import SideBar from "./SideBar";
import ProfileInfo from "./ProfileInfo";
import MyFriendsInfo from "./MyFriendsInfo";
import AllFriendsInfo from "./AllFriendsInfo";
import AllMountainsInfo from "./AllMountainsInfo";
import MyMountains from "./MyMountains";
import classes from "./Home.module.css";

const Home = () => {
  const [activeInfo, setActiveInfo] = useState("profile");

  const onMyActiveInfo = (active) => {
    setActiveInfo(active);
  };

  return (
    <Card className={classes.home}>
      <SideBar onMyActiveInfo={onMyActiveInfo} />
      {activeInfo === "profile" && <ProfileInfo />}
      {activeInfo === "myfriends" && <MyFriendsInfo />}
      {activeInfo === "allfriends" && <AllFriendsInfo />}
      {activeInfo === "allmountains" && <AllMountainsInfo />}
      {activeInfo === "mymountains" && <MyMountains />}
    </Card>
  );
};

export default Home;
