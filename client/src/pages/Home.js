import React, { useState, useEffect } from "react";

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

  // sets a state for the user's state choice
  const [counties, setCounties] = useState([]);
  const [userStateChoice, setUserStateChoice] = useState("");
  const [userCountyChoice, setUserCountyChoice] = useState("");

  const handleUserStateChoice = (e) => {
    // grabs the value from the option selected from the onchange event - need to pass this into the ebird API to get county codes, push those codes into counties array then map through them to create options for the county dropdown!
    setUserStateChoice(e.target.value);
  };

  const handleUserCountyChoice = (e) => {
    console.log("you picked a county! good job!");
  };

  // need useeffect to listen to the state change of the userstatechoice - when it changes, fetch the counties?? need to wrap the api call in useeffect?
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
                <option key={county.code} value={county.name}>
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
          <div id="map"></div>
        </section>
      </div>
    </main>
  );
};

export default Home;
