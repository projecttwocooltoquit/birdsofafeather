import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useState, useEffect } from "react";

const MapContainer = (props) => {
  const mapStyles = {
    width: "100%",
    height: "400px",
    borderStyle: "solid",
    borderColor: "green",
    boxShadow: "0 0px 12px 6px gold",
  };

  // center of the map
  const [coordinates, setCoordinates] = useState({ lat: 10, lng: 10 });
  // info window showing y/n
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  // which marker was clicked on by user
  const [clickedMarker, setClickedMarker] = useState({ lat: 10, lng: 10 });
  // bird selected by clicked marker
  const [clickedBird, setClickedBird] = useState("");

  // sets the coordinates for the center of the map based on the props of the map - runs when props.center changes
  useEffect(() => {
    if (props.center) {
      setCoordinates({ lat: props.center.lat, lng: props.center.lng });
    }
  }, [props.center]);

  // once user clicks on a marker, sets the state for the following states
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
            <p>{clickedBird}</p>
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
