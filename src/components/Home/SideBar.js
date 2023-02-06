import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./SideBar.module.css";

const SideBar = (props) => {
  const [userName, setUserName] = useState("");
  const [activeLink, setActiveLink] = useState("profile");
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
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const changeActiveLinkHandler = (active) => {
    props.onMyActiveInfo(active);
    setActiveLink(active);
  };

  return (
    <Card className={classes.sidebar}>
      <h2 className={classes.headtext}>Hello {userName}!</h2>
      <ul>
        <li>
          <Button
            onClick={() => changeActiveLinkHandler("profile")}
            className={`${classes.notactivelink} ${
              activeLink === "profile"
                ? classes.activelink
                : classes.notactivelink
            }
            `}
          >
            Profile
          </Button>
        </li>
        <li>
          <Button
            onClick={() => changeActiveLinkHandler("myfriends")}
            className={`${classes.notactivelink} ${
              activeLink === "myfriends"
                ? classes.activelink
                : classes.notactivelink
            }
                      `}
          >
            My friends
          </Button>
        </li>
        <li>
          <Button
            onClick={() => changeActiveLinkHandler("mymountains")}
            className={`${classes.notactivelink} ${
              activeLink === "mymountains"
                ? classes.activelink
                : classes.notactivelink
            }
                      `}
          >
            My mountains
          </Button>
        </li>
        <li>
          <Button
            onClick={() => changeActiveLinkHandler("allfriends")}
            className={`${classes.notactivelink} ${
              activeLink === "allfriends"
                ? classes.activelink
                : classes.notactivelink
            }
                      `}
          >
            All people
          </Button>
        </li>
        <li>
          <Button
            onClick={() => changeActiveLinkHandler("allmountains")}
            className={`${classes.notactivelink} ${
              activeLink === "allmountains"
                ? classes.activelink
                : classes.notactivelink
            }
                      `}
          >
            All mountains
          </Button>
        </li>
      </ul>
    </Card>
  );
};

export default SideBar;
