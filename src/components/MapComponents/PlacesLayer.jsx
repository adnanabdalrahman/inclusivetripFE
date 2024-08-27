import React, { useEffect, useState } from "react";

import { useMap } from "react-leaflet";
import { hospitalIcon } from "./icons/hospialIcon";
import { restaurantIcon } from "./icons/resturantIcon";
import { schoolIcon } from "./icons/schoolIcon";
import PlaceMarker from "./PlaceMarker";


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
export default PlacesLayer;