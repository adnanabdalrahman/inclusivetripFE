import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";


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


export default LocationMarker;