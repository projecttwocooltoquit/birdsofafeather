import React, { useState } from "react";
import {
  UPDATE_WATCHLIST,
  UPDATE_SPOTTEDLIST,
  REMOVE_FROM_WATCHLIST,
  REMOVE_FROM_SPOTTEDLIST,
} from "../utils/mutations";
import { useMutation } from "@apollo/client";

// for flickr api call
const Flickr = require("flickr-sdk");

const Card = (props) => {
  // image src for card image
  const [imageSrc, setImageSrc] = useState("");

  // defining mutations
  const [updateWatchList] = useMutation(UPDATE_WATCHLIST);
  const [updateSpottedList] = useMutation(UPDATE_SPOTTEDLIST);
  const [removeFromWatchList] = useMutation(REMOVE_FROM_WATCHLIST);
  const [removeFromSpottedList] = useMutation(REMOVE_FROM_SPOTTEDLIST);

  // flickr API call
  var flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);
  flickr.photos
    .search({
      text: props.sciName,
    })
    .then(function (res) {
      setImageSrc(
        // creates image src link from api response
        `https://live.staticflickr.com/${res.body.photos.photo[1].server}/${res.body.photos.photo[1].id}_${res.body.photos.photo[1].secret}_w.jpg`
      );
    })
    .catch(function (err) {
      console.error(err);
    });

  // adds selected bird to user's watch list
  const handleWatchListAdd = async () => {
    try {
      const { data } = await updateWatchList({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      // needs replaced with modal - no time
      alert(`${props.comName} has been added to your Watch List!`);
    } catch (error) {
      alert(error);
    }
  };

  // adds selected bird to user's spotted list
  const handleSpottedListAdd = async () => {
    try {
      const { data } = await updateSpottedList({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      alert(`${props.comName} has been added to your Spotted List!`);
    } catch (error) {
      alert(error);
    }
  };

  // removes bird from user's watch list
  const handleWatchListRemove = async () => {
    try {
      const { data } = await removeFromWatchList({
        variables: {
          bird: props.sciName,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // removes bird from user's spotted list
  const handleSpottedListRemove = async () => {
    try {
      const { data } = await removeFromSpottedList({
        variables: {
          bird: props.sciName,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // deletes bird from user's watch list, adds them to the spotted list
  const moveToSpottedList = async () => {
    try {
      const { data } = await removeFromWatchList({
        variables: {
          bird: props.sciName,
        },
      });
      handleSpottedListAdd();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // conditional rendering depending on what list type is being called from profile page - mostly changes custom buttons depending on the page or list
  if (props.listType === "watch") {
    return (
      <div className="card birdCard" style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top bird-img"
          src={imageSrc}
          alt={props.comName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.comName}</h5>
          <p className="card-text">{props.sciName}</p>
          <div className="button-container">
            <button className="add-button" onClick={handleWatchListRemove}>
              Remove
            </button>
            <button className="add-button" onClick={moveToSpottedList}>
              Spotted!
            </button>
          </div>
        </div>
      </div>
    );
  } else if (props.listType === "spotted") {
    return (
      <div className="card birdCard" style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top bird-img"
          src={imageSrc}
          alt={props.comName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.comName}</h5>
          <p className="card-text">{props.sciName}</p>
          <div className="button-container">
            <button className="add-button" onClick={handleSpottedListRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card birdCard" style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top bird-img"
          src={imageSrc}
          alt={props.comName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.comName}</h5>
          <p className="card-text">{props.sciName}</p>
          <div className="button-container">
            <button className="add-button" onClick={handleWatchListAdd}>
              Add to Watch List
            </button>
            <button className="add-button" onClick={handleSpottedListAdd}>
              Add to Spotted List
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
