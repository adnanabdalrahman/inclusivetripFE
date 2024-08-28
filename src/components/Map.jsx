import React from "react";
import { useState, useEffect } from "react";


import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySelector from "./MapComponents/CitySelector";
import PlacesLayer from "./MapComponents/PlacesLayer";
import LocationMarker from "./MapComponents/LocationMarker";
import NavigateMap from "./MapComponents/NavigateMap";



// Fix for default marker icon not showing up in React-Leaflet
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
  return (
    <>
      <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
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
        <Marker position={defaultCenter}>
          <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker>
        {/* <SearchField /> */}
        <LocationMarker />
        <NavigateMap selectedCity={selectedCity} />
        <PlacesLayer />
      </MapContainer >
    </>

  );
};

export default Map;