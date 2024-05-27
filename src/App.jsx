import axios from "axios";
import { useRef,useEffect,useState } from "react";
import mapboxgl from "mapbox-gl";
import { Map, Marker, NavigationControl } from "react-map-gl";


const App = () => {
const mapboxToken = 'pk.eyJ1Ijoic2FtaXIzMTIiLCJhIjoiY2x3bmxhcDA4MXRqNzJqbXlmc2dhenFkbCJ9.MJ5Ey_-DgHcsP1o21T0K0Q'
const [location, setLocation] = useState('');
const [weather, setWeather] = useState(null);

const [lat,setLat] = useState("27.700769");
const [lng,setLng] = useState("85.300279");


const handleChange = (e) => {
  setLocation(e.target.value);
};

const handleSearch = async () =>{
  if(location){
    try {
      const apiKey = 'a1307404b2f3364f9f42f8f9faf55273'
      const response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      setWeather(response.data);
      setLat(response.data.coord.lat);
      setLng(response.data.coord.lon);
      } catch (error) {
        console.error(error);
      }
  }
}





return (
  <div className="bg-black text-white h-screen w-screen text-center flex flex-col">
    <h1 className="text-4xl bold pt-10">Weather App</h1>
    <div className="flex justify-center pt-10">
      <input type="text"  value={location} onChange={handleChange} placeholder="  Location" className="text-black"/>
      <button onClick={handleSearch} name="submit" className="ml-2 text-center px-2 py-2 rounded-sm bg-blue-600"> Submit</button>
    </div>
    <div className="mt-10 justify-center items-center">
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
    <div className="relative w-screen h-80 rounded-md border border-black mt-40 ">
    <Map
      mapboxAccessToken={mapboxToken}
       initialViewState={{
        longitude: {lng},
        latitude:{lat},
        zoom: 7
       }}
       mapStyle={"mapbox://styles/mapbox/streets-v9"}
    > 
    <Marker 
      longitude={lng}
      latitude={lat}
    />

    <NavigationControl
      position="bottom-right"
    />



    </Map>
    </div>
  </div>
);}
  

  export default App;
