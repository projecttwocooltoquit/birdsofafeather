import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const Card = (props) => {
  const [imageSrc, setImageSrc] = useState();

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

  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      <img className="card-img-top" src={imageSrc} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.comName}</h5>
        <p className="card-text">{props.sciName}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default Card;
