import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing up (a known Leaflet + webpack quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Kenya's approximate bounding box: [south-west corner, north-east corner]
const KENYA_BOUNDS = [
	[-4.9, 33.9], // south-west
	[5.5, 41.9], // north-east
];
const KENYA_CENTER = [0.0236, 37.9062];


/**
 * shows businesses as pins on a map
 * @param {*} businesses - array of business objects, each optionally with latitude/longitude
 */
const BusinessMap = ({ businesses }) => {
    const businessList = Array.isArray(businesses) ? businesses : [];
	const withCoords = businessList.filter((b) => b.latitude && b.longitude);
	const center = withCoords.length
		? [withCoords[0].latitude, withCoords[0].longitude]
		: KENYA_CENTER

	return (
		<Map center={center} 
             zoom={7}
             minZoom={6}
			 maxZoom={18}
			 maxBounds={KENYA_BOUNDS}
			 maxBoundsViscosity={1.0}
             style={{ height: '500px', width: '100%', zIndex: 0, position: 'relative'  }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; OpenStreetMap contributors'
			/>
			{withCoords.map((b, i) => (
				<Marker position={[b.latitude, b.longitude]} key={i}>
					<Popup>
						<strong>{b.name}</strong><br />{b.category}<br />{b.location}
					</Popup>
				</Marker>
			))}
		</Map>
	);
};

export default BusinessMap;