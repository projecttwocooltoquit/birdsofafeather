import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import purplebird from "./images/purplebird.mp4";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../components/Card";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);

  const [name, setName] = useState("");
  const [userWatchList, setUserWatchList] = useState([]);
  const [userSpottedList, setUserSpottedList] = useState([]);

  useEffect(() => {
    if (!loading) {
      setName(data.me.name);
      setUserWatchList(data.me.watchList);
      setUserSpottedList(data.me.spottedList);
    }
  }, [data]);

  console.log(data);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };


  return (
    <main className="profile-page">
      <video id="videobg" autoPlay loop muted>
        <source src={purplebird} type="video/mp4" />
      </video>
      <div className="name-container">
        <h1>Welcome back, Name!</h1>
        <p>
          You can manage your Watch List and Spotted List below. Happy birding!
        </p>
      </div>
      <div className="watch-list">
        <Carousel responsive={responsive} containerClass="carousel-container" itemClass="profile-carousel-card-extra">
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          {/* {locationBirds.map((bird, index) => (
            <Card key={index} sciName={bird.sciName} comName={bird.comName} />
          ))} */}
        </Carousel>
      </div>
      <div className="spotted-list">
        <Carousel responsive={responsive} containerClass="carousel-container" itemClass="profile-carousel-card-extra">
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          <Card sciName="turdus migratorious" comName="robin" />
          {/* {locationBirds.map((bird, index) => (
            <Card key={index} sciName={bird.sciName} comName={bird.comName} />
          ))} */}
        </Carousel>
      </div>
    </main>
  );

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
  } else {
    return (
      <main className="profile-page">
        <video id="videobg" autoPlay loop muted>
          <source src={purplebird} type="video/mp4" />
        </video>
        <div className="name-container">
          <h1>There's nothing here...</h1>
          <p>
            <Link to="/login">Log In </Link>
            and head to the home page to start birding!
          </p>
          <p>
            If you don't have an account, go ahead and
            <Link to="/signup"> sign up</Link>!
          </p>
        </div>
      </main>
    );
  }

};

export default Profile;
