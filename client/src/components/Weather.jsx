import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useWeather from "../api/Api_getweather";
import SingleSelectedBar from "../components/SingleSelectedBar";

//A weather component in home page, the default city is Brisbane
export default function Weather() {
  const [search, setSearch] = useState("Brisbane");
  const { loading, weather, error } = useWeather(search);

  if (loading) {
    return <div className="container my-5 text-center">Loading...</div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Container>
      <Row className="align-items-center">
        <Col md>
          <SingleSelectedBar onSubmit={setSearch} />
        </Col>
        <Col md>{<WeatherResult {...weather} />}</Col>
      </Row>
    </Container>
  );
}

// Display the name and weather of a city
function WeatherResult({ cityname, main, temp }) {
  return (
    <Container>
      City Weather: {cityname}, {main}, {temp + "°C"}
    </Container>
  );
}
