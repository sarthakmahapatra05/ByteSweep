import React from "react";
import ByteSweepLogo from "../assets/ByteSweepLogo.png";

export default function Logo({ size = 80 }) {
  return (
    <img src={ByteSweepLogo} alt="ByteSweep Logo" style={{ width: size, height: size }} />
  );
} 