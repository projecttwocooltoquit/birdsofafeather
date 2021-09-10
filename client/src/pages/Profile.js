import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import purplebird from "./images/purplebird.mp4";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  // grabs data from currently logged in profile
  const { data } = useQuery(QUERY_ME);

  // user's name
  const [name, setName] = useState("");
  // user's watch list
  const [userWatchList, setUserWatchList] = useState([]);
  // user's spotted list
  const [userSpottedList, setUserSpottedList] = useState([]);

  // sets the state only when data comes back from query
  useEffect(() => {
    if (data) {
      setName(data.me.name);
      setUserWatchList(data.me.watchList);
      setUserSpottedList(data.me.spottedList);
    }
  }, [data]);

  // carousel responsiveness
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // conditionally renders the profile page
  // if the user is logged in, ie, there's user data: displays the user's watch and spotted list
  if (data) {
    return (
      <main className="profile-page">
        <video id="videobg" autoPlay loop muted>
          <source src={purplebird} type="video/mp4" />
        </video>
        <div className="name-container">
          <h1>Welcome back, {name}.</h1>
          <p>
            You can manage your Watch List and Spotted List below. Happy
            birding!
          </p>
        </div>
        <div className="watch-list">
          <h1>Your Watch List 🔭</h1>
          <Carousel responsive={responsive}>
            {userWatchList.map((bird, index) => (
              <Card
                key={index}
                sciName={bird.sciName}
                comName={bird.comName}
                listType="watch"
              />
            ))}
          </Carousel>
        </div>
        <div className="spotted-list">
          <h1>Your Spotted List ✔️</h1>
          <Carousel responsive={responsive}>
            {userSpottedList.map((bird, index) => (
              <Card
                key={index}
                sciName={bird.sciName}
                comName={bird.comName}
                listType="spotted"
              />
            ))}
          </Carousel>
        </div>
      </main>
    );
    // if user is not logged in, they are prompted to log in/sign in to manage their lists
  } else {
    return (
      <main className="profile-page">
        <video id="videobg" autoPlay loop muted>
          <source src={purplebird} type="video/mp4" />
        </video>
        <div className="name-container">
          <h1>There's nothing here...</h1>
          <p>
            <Link className="prof-link" to="/login">
              Log in{" "}
            </Link>
            and head to the home page to start birding!
          </p>
          <p>
            If you don't have an account, go ahead and
            <Link className="prof-link" to="/signup">
              {" "}
              sign up
            </Link>
            !
          </p>
        </div>
      </main>
    );
  }
};

export default Profile;
