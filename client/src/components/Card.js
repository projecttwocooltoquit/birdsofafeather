import React, { useState, useEffect } from "react";
import {
  ADD_BIRD,
  UPDATE_WATCHLIST,
  UPDATE_SPOTTEDLIST,
} from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const Flickr = require("flickr-sdk");

const Card = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  const [watchListBird, setWatchListBird] = useState("");
  const [spottedListBird, setSpottedListBird] = useState("");

  const [addBird, { error }] = useMutation(ADD_BIRD);
  const [updateWatchList] = useMutation(UPDATE_WATCHLIST);
  const [updateSpottedList] = useMutation(UPDATE_SPOTTEDLIST);

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
      const { data } = await addBird({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      console.log(data.addBird._id);
      setWatchListBird(data.addBird._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!watchListBird) {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }
      try {
        const { watchListData } = updateWatchList({
          variables: { birdData: watchListBird },
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [watchListBird]);

  const handleSpottedList = async () => {
    try {
      const { data } = await addBird({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
      setSpottedListBird(data.addBird._id);
      console.log(data.addBird._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!spottedListBird) {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }
      try {
        const { spottedListData } = updateSpottedList({
          variables: { birdData: spottedListBird },
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [spottedListBird]);

  return (
    <div className="card birdCard" style={{ width: 18 + "rem" }}>
      <img className="card-img-top bird-img" src={imageSrc} alt="A bird" />
      <div className="card-body">
        <h5 className="card-title">{props.comName}</h5>
        <p className="card-text">{props.sciName}</p>
        <div className="button-container">
          <button className="add-button" onClick={handleWatchList}>
            Add to Watch List
          </button>
          <button className="add-button" onClick={handleSpottedList}>
            Add to Spotted List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
