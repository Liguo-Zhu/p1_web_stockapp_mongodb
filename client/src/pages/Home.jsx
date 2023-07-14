import React from "react";
import HeroImage from "../components/HeroImage";
import NewsList from "../components/NewsList";
import Weather from "../components/Weather";

// ===home page
export default function Home() {
  return (
    <div className="container">
      <HeroImage />
      <br />
      <Weather />
      <hr />
      <NewsList />
    </div>
  );
}
