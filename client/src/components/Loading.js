import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div align="center">
      <Loader
        type="BallTriangle"
        color="green"
        height={200}
        width={200}
        timeout={2000} //3 secs
      />
    </div>
  );
};
export default Loading;
