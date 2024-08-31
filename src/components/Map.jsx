import React from "react";
import { useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySelector from "./MapComponents/CitySelector";
import PlacesLayer from "./MapComponents/PlacesLayer";
import LocationMarker from "./MapComponents/LocationMarker";
import NavigateMap from "./MapComponents/NavigateMap";
import CategorySelector from "./MapComponents/CategorySelector";


L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});


const SearchField = () => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar', // Optional: 'button' for a smaller search bar
      showMarker: true, // Optional: Display a marker for search result
      autoClose: true, // Optional: Close the search bar after selection
      retainZoomLevel: false, // Optional: Keep zoom level after search
      animateZoom: true, // Optional: Animate zoom to search result
      keepResult: true, // Optional: Keep the search result
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const Map = () => {
  const [defaultCenter, setDefaultCenter] = useState([52.51085635037089, 13.399439386103111]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  return (
    <>
      <div className="flex space-x-4 items-center">
        <div className="p-4 mr-9">
          <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        </div>
        <div className="p-4 mx-9">
          <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={15}
        minZoom={14}
        style={{ zIndex: 9, height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={[52.51444539703697, 13.400659561157228]}>
          <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker> */}
        {/* <SearchField /> */}
        <LocationMarker />
        <NavigateMap selectedCity={selectedCity} />
        <PlacesLayer selectedCategory={selectedCategory} />
      </MapContainer >
    </>

  );
};

export default Map;