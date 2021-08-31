import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MapContainer from "../components/MapContainer";
import Marker from "google-maps-react";

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

  // useEffect listens to user's state choice and makes an api call using the state info to generate a list of counties
  // sets the county state which is then used to populate the county choices dropdown
  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "6fh7ke4gee7v");

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
      .then((data) => {
        data.forEach((county) => {
          setCounties(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userStateChoice]);

  // listens for user's county choice, makes ebird api call to find birds at that location
  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "6fh7ke4gee7v");

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
  }, [userCountyChoice]);

  return (
    <main className="container">
      <div className="row">
        <section className="col-6 col-md-4 d-flex flex-column mt-2">
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
        <section className="col-md-8 mt-2">
          <MapContainer locations={locationBirds}></MapContainer>
        </section>
      </div>
      <div>
        {locationBirds.map((bird) => (
          <Card sciName={bird.sciName} comName={bird.comName} />
        ))}
      </div>
    </main>
  );
};

export default Home;
