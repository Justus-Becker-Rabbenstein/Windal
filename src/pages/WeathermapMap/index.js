import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Lottie from 'react-lottie';
import animationData from "../../lotties/32532-day-night.json";
import lottieConfig from "../../hooks/lottieConfig";
import { Container } from 'react-bootstrap';

const WeathermapMap = ({ lng, lat, zoom }) => {

  // GET REQUEST USE STATE
  const [weatherApiData, setWeatherApiData] = useState([]);

  // FETCH DATA WITH HTTP GET
  const [timerFinished, setTimerFinished] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.APIKEYWEATHER}`);
      const data = await response.json();
      setWeatherApiData([data]);
    }
    fetchData();
  }, [timerFinished]);

  // REFRESH TIMER
  const [counter, setCounter] = useState(15);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setCounter(15);
      setTimerFinished(!timerFinished);
    }
  }, [counter]);


  return (
    <main>
      <Container>
        <Container>
          {weatherApiData.map((dataOfQuery) =>
            <Card key={dataOfQuery.id} style={{ width: '18rem' }} className="text-center mt-3 p-2">
              <Container className='' fluid style={{ width: "50%" }}><h5>Time until refresh: {counter}</h5></Container>
              <Lottie
                options={lottieConfig(animationData)}
                height="100px"
                width="100px"
              />
              <h1>The weather today in ...</h1>
              <Card.Body>
                <Card.Title>Longitude: {lng} | Latitude: {lat}</Card.Title>
                <Card.Text>
                  Temperature: {Math.trunc(dataOfQuery.main.temp - 273.15)} ° C
                </Card.Text>
                <Card.Text>
                  Humidity: {dataOfQuery.main.humidity} %
                </Card.Text>
                <Card.Text>
                  Wind speed: {dataOfQuery.wind.speed} m/s
                </Card.Text>
                <Card.Text>
                  Weather conditions: {dataOfQuery.weather.map((insideWeather) => insideWeather.description)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      </Container>
    </main>

  )
}

export default WeathermapMap