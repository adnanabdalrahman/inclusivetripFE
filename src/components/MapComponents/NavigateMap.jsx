import React from 'react';
import { useMap } from 'react-leaflet';

const NavigateMap = ({ selectedCity }) => {
    const map = useMap(); // Access the map instance

    // Move the map to the city's coordinates when cityId changes
    React.useEffect(() => {
        if (selectedCity) {
            map.setView([selectedCity[1], selectedCity[0]]); // Set view to city coordinates with a zoom level of 12
        }
    }, [selectedCity, map]);

    return null; // This component does not render anything on its own
}

export default NavigateMap;