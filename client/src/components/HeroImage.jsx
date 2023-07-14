import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Heroimage1 from "../images/heroimage1.png";
import Heroimage2 from "../images/heroimage2.png";
import Heroimage3 from "../images/heroimage3.png";

// === HeroImage page
export default function HeroImage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={Heroimage1} alt="First slide" />
        <Carousel.Caption>
          <h1>Welcome to QUT STOCKS!</h1>
          <h3>Here you can get the latest stock information</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={Heroimage2} alt="Second slide" />
        <Carousel.Caption>
          <h1>Welcome to QUT STOCKS!</h1>
          <h3>Search for the stock you need to learn more</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={Heroimage3} alt="Third slide" />
        <Carousel.Caption>
          <h1>Welcome to QUT STOCKS!</h1>
          <h3>Contact us if the information here is not enough</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
