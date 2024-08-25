import L from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';

// Create a FontAwesomeIcon component
const FontAwesomeIconComponent = ({ icon }) => (
    <div style={{ fontSize: '24px', color: 'red' }}>
        <FontAwesomeIcon icon={icon} />
    </div>
);

// Function to create a Leaflet icon using FontAwesome icons
const createIcon = (icon) => {
    return new L.DivIcon({
        className: 'leaflet-div-icon',
        html: ReactDOMServer.renderToString(<FontAwesomeIconComponent icon={icon} />),
        iconSize: [32, 32], // Adjust size as needed
    });
};

// Create icons for different place types
export const hospitalIcon = createIcon(faHospital);
