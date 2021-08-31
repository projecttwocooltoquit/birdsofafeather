import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = (props) => {
  console.log(props.locations);
  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  if (props.locations) {
    return (
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
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
