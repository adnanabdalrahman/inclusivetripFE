
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

import { useNavigate } from "react-router-dom";

const PlaceMarker = function ({ place, placeIcon }) {
    const navigate = useNavigate();
    const handleMarkerClick = (position) => {

    };
    const handleRateClick = (place) => {
        navigate(`/ratings`, { state: { place: place } });
    };

    return (
        <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={placeIcon}
            eventHandlers={{
                click: () => handleMarkerClick([place.lat, place.lon]),
            }}
        >
            <Popup>Bewertungs : .... {place.name}  - {[place.lat, place.lon]}
                <button className="btn btn-warning p-2 h-8 min-h-2 m-2"
                    onClick={() => handleRateClick(place)}>Bewerten</button>
            </Popup>
        </Marker>
    );
};

export default PlaceMarker;