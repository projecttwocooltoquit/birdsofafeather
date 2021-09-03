import React from "react";
import purplebird from "./images/purplebird.mp4";

const Profile = () => {
  return (
    <main>
      <video id="videobg" autoPlay loop muted>
        <source src={purplebird} type="video/mp4" />
      </video>
    </main>
  );
};

export default Profile;
