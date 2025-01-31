// DotsLoading.js
import React from "react";
import "./DotsLoading.css"; // Import the CSS file for keyframes

const DotsLoading = () => {
  return (
    <section className="flex items-center justify-center h-full w-full">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );
};

export default DotsLoading;
