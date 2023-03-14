import Header from '@/components/Header/Header'
import { SSRProvider } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import Footer from '@/components/Footer/Footer';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App({ Component, pageProps }) {

  // INPUT FOR TEXT BASED WEATHER SEARCH
  const [inputCountry, setInputCountry] = useState("")
  const [inputCity, setInputCity] = useState("")
  function handleInputCountryChange(inputCountyText) {
    setInputCountry(inputCountyText);
  }
  function handleInputCityChange(inputCityText) {
    setInputCity(inputCityText);
  }

  // COORDINATES OF MAP SEARCH
  const [lng, setLng] = useState(10.4967);
  const [lat, setLat] = useState(51.7263);
  const [zoom, setZoom] = useState(3.46);

  return (
    <SSRProvider>
      <Header />
      <Component
        {...pageProps}
        handleInputCountryChange={handleInputCountryChange}
        handleInputCityChange={handleInputCityChange}
        inputCountry={inputCountry}
        inputCity={inputCity}
        lng={lng}
        lat={lat}
        zoom={zoom}
        setLng={setLng}
        setLat={setLat}
        setZoom={setZoom}
      />
      <Footer />
    </SSRProvider>
  )
}
