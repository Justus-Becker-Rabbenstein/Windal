import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Lottie from 'react-lottie';
import animationData from "../lotties/137716-weather.json";
import lottieConfig from "../hooks/lottieConfig";
import Link from 'next/link'
import countryCodes from '@/utils/countryCodes';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import Container from 'react-bootstrap/Container';


export default function Home({
  handleInputCountryChange,
  handleInputCityChange,
  lng,
  lat,
  zoom,
  setLng,
  setLat,
  setZoom
}) {

  // USE STATE COUNTRIES
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    setCountryData(countryCodes);
  }, [])

  // WRITE COUNTRY CODE TO USESTATE
  function onSelectCountry(event) {
    handleInputCountryChange(event.target.value)
  }
  function onSelectCity(event) {
    handleInputCityChange(event.target.value)
  }

  // MAPBOX 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  mapboxgl.accessToken = `${process.env.APIKEYMAP}`;
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Container className="bg-light rounded">
          <h3>Welcome to Windal, your weather app.</h3>
          <Stack gap={0}>
            <Container className="bg-light border">
              <Lottie
                options={lottieConfig(animationData)}
                height="100px"
                width="100px"
              />
            </Container>
          </Stack>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Select by text: please enter your country and city.</Form.Label>
              <Form.Select aria-label="Select your country" onChange={onSelectCountry}>
                {countryData.map((singleCountry) =>
                    <option key={singleCountry.name} value={singleCountry.code}>{singleCountry.name}</option>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control type="text" placeholder="Enter city" onChange={onSelectCity} />
            </Form.Group>
            <Link href="/WeathermapText">
              <div className="text-center">
                <Button variant="primary" type="submit" className='auto m-2'>
                  Show weather
                </Button>
              </div>
            </Link>
          </Form>
        

        <Form className='bg-light rounded mt-3 p-2'>
          <Form.Label>Select by hover: please hover over the area, where you would like to see the weather</Form.Label>
          <Container>
            <Container>
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </Container>
            <Container ref={mapContainer} style={{ height: "400px" }} />
          </Container>
          <Link href="/WeathermapMap">
            <div className="text-center">
              <Button variant="primary" type="submit" className='auto mt-2'>
                Show weather
              </Button>
            </div>
          </Link>
        </Form>
        </Container>
      </main>
    </>
  )
}
