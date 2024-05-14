import React from "react";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";

const Loader = () => {
  return (
    <div
      className="fixed z-10 top-0 w-screen h-screen flex justify-center items-center"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
      <Lottie
        loop
        animationData={loaderGif}
        play
        style={{
          width: 150,
          height: 150,
        }}
      />
    </div>
  );
};

export default Loader;
