import React from "react";
import { useState, useEffect } from "react";
import { hospitalIcon } from "./icons/hospialIcon";
import { restaurantIcon } from "./icons/resturantIcon";
import { schoolIcon } from "./icons/schoolIcon";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySelector from "./CitySelector";
import PlaceMarker from "./PlaceMarker";

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

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng); // e.latlng contains the latitude and longitude of the clicked point
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked here: {position.lat}, {position.lng}</Popup>
    </Marker>
  );
};

//---------------------PLACES-------------------------------------------

const fetchPlaces = async (bbox, amenity) => {
  const overpassUrl = "https://overpass-api.de/api/interpreter";
  const query = `
    [out:json];
    node["amenity"="${amenity}"](${bbox});
    out body;
  `;

  const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.elements.map((element) => ({
    id: element.id,
    lat: element.lat,
    lon: element.lon,
    name: element.tags.name,
  }));
};

const PlacesLayer = () => {
  const [hospitals, setHospitals] = useState([]);
  const [schools, setSchools] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const map = useMap();

  useEffect(() => {
    const fetchAndSetPlaces = async () => {
      const bounds = map.getBounds();
      const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

      const [clinicData, hospitalData, schoolData, restaurantData] = await Promise.all([
        fetchPlaces(bbox, 'clinic'),
        fetchPlaces(bbox, 'hospital'),
        fetchPlaces(bbox, 'school'),
        fetchPlaces(bbox, 'restaurant'),
      ]);

      setClinics(clinicData);
      setHospitals(hospitalData);
      setSchools(schoolData);
      setRestaurants(restaurantData);
    };

    fetchAndSetPlaces();

    map.on('moveend', fetchAndSetPlaces);

    return () => {
      map.off('moveend', fetchAndSetPlaces);
    };
  }, [map]);

  return (
    <>
      {clinics.map((clinic) => (
        <PlaceMarker key={clinic.id} place={clinic} placeIcon={hospitalIcon} />
      ))}
      {hospitals.map((hospital) => (
        <PlaceMarker key={hospital.id} place={hospital} placeIcon={hospitalIcon} />
      ))}
      {schools.map((school) => (
        <PlaceMarker key={school.id} place={school} placeIcon={schoolIcon} />
      ))}
      {restaurants.map((restaurant) => (
        <PlaceMarker key={restaurant.id} place={restaurant} placeIcon={restaurantIcon} />
      ))}

    </>
  );
};

const Map = () => {
  const [defaultCenter, setDefaultCenter] = useState([52.51085635037089, 13.399439386103111]);
  return (
    <>
      <CitySelector />
      <MapContainer
        center={[52.51085635037089, 13.399439386103111]}
        zoom={13}
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
        <PlacesLayer />
      </MapContainer >
    </>

  );
};

export default Map;