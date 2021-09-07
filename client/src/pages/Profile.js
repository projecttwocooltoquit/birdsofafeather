import React from "react";
import purplebird from "./images/purplebird.mp4";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../components/Card";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const profiles = data?.profiles || [];

  console.log(data);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
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
        <Carousel responsive={responsive}>
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
        <Carousel responsive={responsive}>
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
};

export default Profile;
