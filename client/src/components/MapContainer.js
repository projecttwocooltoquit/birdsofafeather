import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { useState, useEffect } from "react";

const MapContainer = (props) => {
  const mapStyles = {
    width: "45%",
    height: "60%",
    borderStyle: "solid",
    borderColor: "green",
    boxShadow: "0 0px 12px 6px gold"
  };

  // state to contain coordinates to center the map
  const [coordinates, setCoordinates] = useState({ lat: 10, lng: 10 });

  // listens for changes in props, sets the coordinates of the center to whatever the center coordinate that is passed into the component
  useEffect(() => {
    if (props.center) {
      setCoordinates({ lat: props.center.lat, lng: props.center.lng });
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
        {props.locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
      </Map>
    );
  } else {
    return (
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        className="mapStyle"
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      ></Map>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAs3k9TKjBGM8LpOITw_YbAXNMAIXAvU_A",
})(MapContainer);
