import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MapContainer from "../components/MapContainer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import forest from "./images/forest.mp4";
import Typewriter from "typewriter-effect";
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

  // responsive info for carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // holds user's state choice from state dropdown
  const [userStateChoice, setUserStateChoice] = useState("");
  // holds the counties generated from ebird api call based on selected state
  const [counties, setCounties] = useState([]);
  // holds the user's county choice from county dropdown - this is the county code not the county name
  const [userCountyChoice, setUserCountyChoice] = useState("");
  // all birds spotted at that location from ebird api call
  const [locationBirds, setLocationBirds] = useState([]);

  const handleUserStateChoice = (e) => {
    // grabs value from dropdown selection and updates state
    setUserStateChoice(e.target.value);
  };

  const handleUserCountyChoice = (e) => {
    // grabs value from dropdown selection and updates state
    setUserCountyChoice(e.target.value);
  };
  // takes in user's state choice, makes ebird API call to generate counties and county code values
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

  // takes in user's county choice, makes ebird API call to generate birds spotted in that area
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
        `https://api.ebird.org/v2/data/obs/${userCountyChoice}/recent?maxResults=10`,
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

  return (
    <main>
      <video id="videobg" autoPlay loop muted>
        <source src={forest} type="video/mp4" />
      </video>
      <div className="homebanner">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Birds of a Feather, flock together!")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Welcome!")
              .start();
          }}
        />
      </div>
      <div className="container p-5">
        <div className="row">
          <section className="menuPosition column">
            <h4>Select a state and county to begin.</h4>
            <p>
              See a bird you want to keep an eye out for? Click "Add to Watch
              List".
            </p>
            <p>
              To add a bird you've already seen, click "Add to Spotted List".
            </p>
            <p>You can manage your lists on your profile page!</p>
            <div className="container">
              <select
                id="state-dropdwn"
                className="form-select m-1"
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
                className="form-select m-1"
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
            </div>
          </section>
          <section className="mapPosition column">
            <MapContainer
              locations={locationBirds}
              center={locationBirds[1]}
            ></MapContainer>
          </section>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="container">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="home-carousel-card-extra"
        >
          {locationBirds.map((bird, index) => (
            <Card key={index} sciName={bird.sciName} comName={bird.comName} />
          ))}
        </Carousel>
      </div>
    </main>
  );
};

export default Home;
