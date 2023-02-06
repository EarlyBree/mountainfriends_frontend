import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import MountainCard from "./MountainCard";
import MountainDetails from "./MountainDetails";
import classes from "./AllMountainsInfo.module.css";

const AllMountainsInfo = () => {
  const [allMountains, setAllMountains] = useState([]);
  const [mountainInfo, setMountainInfo] = useState([]);
  useEffect(() => {
    const fetchAllMountains = async () => {
      try {
        const response = await fetch(
          "https://mountainfriends-backend.onrender.com/getallmountains"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        // let body = JSON.parse(JSON.stringify(response));
        const body = await response.json();
        setAllMountains(body);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllMountains();
  }, []);

  const showDetails = async (id) => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    };
    try {
      const response = await fetch(
        "https://mountainfriends-backend.onrender.com/getmountainbyid",
        reqOptions
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const body = await response.json();
      setMountainInfo(body);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (mountainInfo.length > 0) {
      // console.log(mountainInfo[0].name);
    }
  }, [mountainInfo]);

  const goBackHandler = () => {
    setMountainInfo([]);
  };

  const allMountainCards = allMountains.map((mountain) => (
    <MountainCard
      key={mountain.id}
      id={mountain.id}
      name={mountain.name}
      altitude={mountain.altitude}
      onShowDetails={showDetails}
    />
  ));

  return (
    <Card className={classes.mountainsinfo}>
      <h1>All mountains</h1>
      {!mountainInfo.length > 0 && <ul>{allMountainCards}</ul>}

      {mountainInfo.length > 0 && (
        <MountainDetails
          id={mountainInfo[0].id}
          name={mountainInfo[0].name}
          altitude={mountainInfo[0].altitude}
          difference={mountainInfo[0].difference}
          longitude={mountainInfo[0].longitude}
          duration={mountainInfo[0].duration}
          onBack={goBackHandler}
        />
      )}
    </Card>
  );
};

export default AllMountainsInfo;
