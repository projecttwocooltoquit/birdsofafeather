import React, { useState, useEffect } from "react";
import { ADD_BIRD, UPDATE_WATCHLIST } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const Flickr = require("flickr-sdk");

const Card = (props) => {
  const cardStyles = {
    width: "100%",
    height: "50%",
  };

  const [imageSrc, setImageSrc] = useState();
  const [addBird, { error }] = useMutation(ADD_BIRD);
  const [updateWatchList] = useMutation(UPDATE_WATCHLIST);

  var flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);
  flickr.photos
    .search({
      text: props.sciName,
    })
    .then(function (res) {
      setImageSrc(
        `https://live.staticflickr.com/${res.body.photos.photo[1].server}/${res.body.photos.photo[1].id}_${res.body.photos.photo[1].secret}_w.jpg`
      );
    })
    .catch(function (err) {
      console.error(err);
    });

  const handleWatchList = async () => {
    // bird gets added to db
    try {
      // the data here is the id that comes back - take the data and await it later and add it into the profile
      // look at the cart code from week 22 folder 23
      // adding a list of id's for birds in the database to the user's profile - once i'm on the profile page, need to get all the id's in the user's list and query the db for all birds with that id...
      const { data } = await addBird({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      console.log(data.addBird._id);
      // updateWatchList(data.addBird._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card birdCard" style={{ width: 18 + "rem" }}>
      <img
        className="card-img-top"
        style={cardStyles}
        src={imageSrc}
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.comName}</h5>
        <p className="card-text">{props.sciName}</p>
        <button onClick={handleWatchList}>Add to Watch List</button>
        <button>Add to Spotted List</button>
      </div>
    </div>
  );
};

export default Card;
