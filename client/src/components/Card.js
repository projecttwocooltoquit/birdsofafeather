import React, { useState, useEffect } from "react";
import {
  UPDATE_WATCHLIST,
  UPDATE_SPOTTEDLIST,
  REMOVE_FROM_WATCHLIST,
  REMOVE_FROM_SPOTTEDLIST,
} from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Flickr = require("flickr-sdk");

const Card = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [updateWatchList] = useMutation(UPDATE_WATCHLIST);
  const [updateSpottedList] = useMutation(UPDATE_SPOTTEDLIST);
  const [removeFromWatchList] = useMutation(REMOVE_FROM_WATCHLIST);
  const [removeFromSpottedList] = useMutation(REMOVE_FROM_SPOTTEDLIST);

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

  const handleWatchListAdd = async () => {
    try {
      const { data } = await updateWatchList({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });

      alert(`${props.comName} has been added to your Watch List!`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpottedListAdd = async () => {
    try {
      const { data } = await updateSpottedList({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      setShowModal(true);
      alert(`${props.comName} has been added to your Spotted List!`);
    } catch (error) {
      console.log(error);
    }
  };

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
