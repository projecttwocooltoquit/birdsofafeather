import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useState, useEffect } from "react";
import Spiderfy from "./Spiderfy";

const MapContainer = (props) => {
  const mapStyles = {
    width: "50%",
    height: "50%",
    borderStyle: "solid",
    borderColor: "green",
    boxShadow: "0 0px 12px 6px gold",
  };

  // state to contain coordinates to center the map
  const [coordinates, setCoordinates] = useState({ lat: 10, lng: 10 });
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [clickedMarker, setClickedMarker] = useState({ lat: 10, lng: 10 });
  const [clickedBird, setClickedBird] = useState("");

  // sets the coordinates of the center to whatever the center coordinate that is passed into the component
  useEffect(() => {
    if (props.center) {
      setCoordinates({ lat: props.center.lat, lng: props.center.lng });
    }
  }, [props.center]);

  const onMarkerClick = (e) => {
    setClickedBird(e.value);
    setClickedMarker(e.position);
    setShowingInfoWindow(true);
  };

  // only renders markers if props are defined, otherwise renders map with no markers
  if (props.locations) {
    return (
      <Map
        google={props.google}
        zoom={10}
        style={mapStyles}
        center={coordinates}
      >
        {props.locations.map((location, index) => (
          <Marker
            key={index}
            value={location.comName}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={(e) => onMarkerClick(e)}
          ></Marker>
        ))}
        <InfoWindow visible={showingInfoWindow} position={clickedMarker}>
          <div>
            <h4>{clickedBird}</h4>
          </div>
        </InfoWindow>
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
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
