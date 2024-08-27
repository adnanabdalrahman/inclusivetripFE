import React, { useEffect, useState } from 'react';
import FilteredSelect from './FilteredSelect';
// import citiesGeoJson from '../data/cities.geojson';

const CitySelector = ({ selectedCity, setSelectedCity }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('/cities.geojson');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && data.features) {
                    const citiesData = data.features.map(feature => ({
                        name: feature.properties.name,
                        id: feature.id,
                        coord: feature.geometry.coordinates,
                    }));

                    setCities(citiesData);
                } else {
                    console.error('Invalid GeoJSON format.');
                }
            } catch (error) {
                console.error('Error fetching GeoJSON file:', error.message);
            }
        };

        fetchCities();
    }, []);

    const handleSelect = (city) => {
        setSelectedCity(city.coord);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Select a City</h1>
            <div className="mb-4">
                <FilteredSelect
                    options={cities}
                    selectedValue={selectedCity}
                    onSelect={handleSelect}
                />
            </div>
            <form>
                <input type="hidden" value={selectedCity} />
                <input type="submit" value="Submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600" />
            </form>
        </div>
    );
};

export default CitySelector;
