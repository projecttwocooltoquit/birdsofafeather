import React, { useState } from "react";
import { ADD_BIRD } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const Card = (props) => {
  const [imageSrc, setImageSrc] = useState();
  const [addBird, { error }] = useMutation(ADD_BIRD);

  fetch(
    `https://api.unsplash.com/search/photos?page=2&query=${props.comName}&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setImageSrc(data.results[0].urls.full);
    })
    .catch((error) => {
      console.error(error);
    });

  const handleWatchList = async () => {
    // bird gets added to db
    try {
      // the data here is the id that comes back - take the data and await it later and add it into the profile
      // look at the cart code from week 22 folder 23
      const { data } = await addBird({
        variables: {
          sciName: props.sciName,
          comName: props.comName,
          imgSrc: imageSrc,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card birdCard" style={{ width: 18 + "rem" }}>
      <img className="card-img-top" src={imageSrc} alt="Card cap" />
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
