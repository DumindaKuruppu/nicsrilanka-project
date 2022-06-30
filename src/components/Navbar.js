import React from "react";
import IdImage from "../images/id-image.png";
import "../style.css";

function Navbar() {
  return (
    <nav>
      <img src={IdImage} alt="logo" />
      <h3>NIC Number Converter</h3>
      <h4>A React Project</h4>
    </nav>
  );
}

export default Navbar;
