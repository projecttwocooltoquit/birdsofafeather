import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { useState, useEffect } from "react";

const MapContainer = (props) => {
  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  // state to contain coordinates to center the map
  const [coordinates, setCoordinates] = useState([10, 10]);

  // listens for changes in props, sets the coordinates of the center to whatever the center coordinate that is passed into the component
  useEffect(() => {
    if (props.center) {
      setCoordinates(props.center);
    }
  }, [props.center]);

  // only renders markers if props are defined, otherwise renders map with no markers
  if (props.locations) {
    return (
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        center={coordinates}
      >
        {props.locations.map((location) => (
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </Map>
    );
  } else {
    return (
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      ></Map>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAs3k9TKjBGM8LpOITw_YbAXNMAIXAvU_A",
})(MapContainer);
