import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MapContainer from "../components/MapContainer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import forest from "./images/forest.mp4";

// import { ApolloProvider, useMutation } from "@apollo/client";

const API_KEY = process.env.REACT_APP_EBIRD_API_KEY;

const Home = () => {

  const states = [
    {
      name: "Alabama",
      abbreviation: "AL",
    },
    {
      name: "Alaska",
      abbreviation: "AK",
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
    },
    {
      name: "California",
      abbreviation: "CA",
    },
    {
      name: "Colorado",
      abbreviation: "CO",
    },
    {
      name: "Connecticut",
      abbreviation: "CT",
    },
    {
      name: "Delaware",
      abbreviation: "DE",
    },
    {
      name: "Florida",
      abbreviation: "FL",
    },
    {
      name: "Georgia",
      abbreviation: "GA",
    },
    {
      name: "Hawaii",
      abbreviation: "HI",
    },
    {
      name: "Idaho",
      abbreviation: "ID",
    },
    {
      name: "Illinois",
      abbreviation: "IL",
    },
    {
      name: "Indiana",
      abbreviation: "IN",
    },
    {
      name: "Iowa",
      abbreviation: "IA",
    },
    {
      name: "Kansas",
      abbreviation: "KS",
    },
    {
      name: "Kentucky",
      abbreviation: "KY",
    },
    {
      name: "Louisiana",
      abbreviation: "LA",
    },
    {
      name: "Maine",
      abbreviation: "ME",
    },
    {
      name: "Maryland",
      abbreviation: "MD",
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
    },
    {
      name: "Michigan",
      abbreviation: "MI",
    },
    {
      name: "Minnesota",
      abbreviation: "MN",
    },
    {
      name: "Mississippi",
      abbreviation: "MS",
    },
    {
      name: "Missouri",
      abbreviation: "MO",
    },
    {
      name: "Montana",
      abbreviation: "MT",
    },
    {
      name: "Nebraska",
      abbreviation: "NE",
    },
    {
      name: "Nevada",
      abbreviation: "NV",
    },
    {
      name: "New Hampshire",
      abbreviation: "NH",
    },
    {
      name: "New Jersey",
      abbreviation: "NJ",
    },
    {
      name: "New Mexico",
      abbreviation: "NM",
    },
    {
      name: "New York",
      abbreviation: "NY",
    },
    {
      name: "North Carolina",
      abbreviation: "NC",
    },
    {
      name: "North Dakota",
      abbreviation: "ND",
    },
    {
      name: "Ohio",
      abbreviation: "OH",
    },
    {
      name: "Oklahoma",
      abbreviation: "OK",
    },
    {
      name: "Oregon",
      abbreviation: "OR",
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA",
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR",
    },
    {
      name: "Rhode Island",
      abbreviation: "RI",
    },
    {
      name: "South Carolina",
      abbreviation: "SC",
    },
    {
      name: "South Dakota",
      abbreviation: "SD",
    },
    {
      name: "Tennessee",
      abbreviation: "TN",
    },
    {
      name: "Texas",
      abbreviation: "TX",
    },
    {
      name: "Utah",
      abbreviation: "UT",
    },
    {
      name: "Vermont",
      abbreviation: "VT",
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI",
    },
    {
      name: "Virginia",
      abbreviation: "VA",
    },
    {
      name: "Washington",
      abbreviation: "WA",
    },
    {
      name: "West Virginia",
      abbreviation: "WV",
    },
    {
      name: "Wisconsin",
      abbreviation: "WI",
    },
    {
      name: "Wyoming",
      abbreviation: "WY",
    },
  ];
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

  // states that listen to user's choices
  const [counties, setCounties] = useState([]);
  const [userStateChoice, setUserStateChoice] = useState("");
  const [userCountyChoice, setUserCountyChoice] = useState("");
  const [locationBirds, setLocationBirds] = useState([]);

  const handleUserStateChoice = (e) => {
    // grabs the value from the user selected state option
    setUserStateChoice(e.target.value);
  };

  const handleUserCountyChoice = (e) => {
    setUserCountyChoice(e.target.value);
  };

  useEffect(() => {
    if (!!userCountyChoice) {
      // Your useEffect code here to be run on update
      let myHeaders = new Headers();
      myHeaders.append("X-eBirdApiToken", API_KEY);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://api.ebird.org/v2/data/obs/${userCountyChoice}/recent?maxResults=5`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLocationBirds(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userCountyChoice]);

  // useEffect listens to user's state choice and makes an api call using the state info to generate a list of counties
  // sets the county state which is then used to populate the county choices dropdown
  useEffect(() => {
    if (!!userStateChoice) {
      let myHeaders = new Headers();
      myHeaders.append("X-eBirdApiToken", API_KEY);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://api.ebird.org/v2/ref/region/list/subnational2/US-${userStateChoice}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        })
        .then((data) => {
          setCounties(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userStateChoice]);

  return (
    <main>
      <video id="videobg" autoPlay loop muted>
        <source src={forest} type="video/mp4" />
      </video>
      <div className="flexWrap">
        <section className="menuPostion">
          <p className="lead">
            This is a lead paragraph. It stands out from regular paragraphs.
          </p>
          <div className="container d-flex">
            <select
              id="state-dropdwn"
              className="form-select m-2"
              value={userStateChoice}
              onChange={handleUserStateChoice}
            >
              <option defaultValue={userStateChoice}>Select a state</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              id="county-dropdwn"
              className="form-select m-2"
              value={userCountyChoice}
              onChange={handleUserCountyChoice}
            >
              <option defaultValue={userCountyChoice}>Select a county</option>
              {counties.map((county) => (
                <option key={county.code} value={county.code}>
                  {county.name}
                </option>
              ))}
            </select>
            <button id="go-btn" type="button" className="btn btn-dark">
              Go
            </button>
          </div>
        </section>
        <section className="mapPosition">
          <MapContainer
            locations={locationBirds}
            center={locationBirds[1]}
          ></MapContainer>
          {locationBirds.map((bird, index) => (
            <Card key={index} sciName={bird.sciName} comName={bird.comName} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Home;
