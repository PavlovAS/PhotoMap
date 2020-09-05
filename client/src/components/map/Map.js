import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../../css/map.css';
import { updatePhotoMongo } from '../../actions/photo';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';
import { mapboxConfig } from '../../firebase/config';

const Map = ({
	currentPhoto: { photo, loading },
	mapState: { photosOverview },
	updatePhotoMongo,
	fetchPhotosOverview,
	history,
}) => {
	var currentPosition = {
		lat: 0,
		lng: 0,
	};

	var markers = [];
	var map;

	const showMarker = function(lngLat) {
        var markerHeight = 50,
            markerRadius = 10,
            linearOffset = 25;

        var popupOffsets = {
            top: [0, 0],
            'top-left': [0, 0],
            'top-right': [0, 0],
            bottom: [0, -markerHeight],
            'bottom-left': [
                linearOffset,
                (markerHeight - markerRadius + linearOffset) * -1,
            ],
            'bottom-right': [
                -linearOffset,
                (markerHeight - markerRadius + linearOffset) * -1,
            ],
            left: [markerRadius, (markerHeight - markerRadius) * -1],
            right: [-markerRadius, (markerHeight - markerRadius) * -1],
        };

        var popup = new mapboxgl.Popup({
            offset: popupOffsets,
            className: 'my-class',
            closeButton: false,
        })
            .setMaxWidth('300px')
            .addTo(map);

        var newMarker = new mapboxgl.Marker({ draggable: true })
            .setLngLat(lngLat)
            .addTo(map)
            .setPopup(popup);

        markers.push(newMarker);
    }

	const initMap = function() {
		mapboxgl.accessToken = mapboxConfig.accessToken;

		map = new mapboxgl.Map({
			container: document.getElementById('mapContainer'),
			style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
			center: [-122.7, 49.2], // starting position [lng, lat]
			zoom: 9, // starting zoom
		});

		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
				zoom: 10,
			})
		);

		var nav = new mapboxgl.NavigationControl();
		map.addControl(nav, 'top-left');

		fetchPhotos();
		
		photosOverview.forEach(photo => {	
			showMarker(photo.lngLat);
		});
	}

	useEffect(() => {
		initMap();
	}, []);

	const fetchPhotos = async (center, zoom) => {
		await fetchPhotosOverview();
	}

	return (
		<div>
			<div id="mapContainer" className="mapContainer" />
		</div>
	);
};

Map.propTypes = {
	currentPhoto: PropTypes.object.isRequired,
	mapState: PropTypes.object.isRequired,
	updatePhotoMongo: PropTypes.func.isRequired,
	fetchPhotosOverview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	currentPhoto: state.currentPhoto,
	mapState: state.mapState
});

export default connect(mapStateToProps, { updatePhotoMongo, fetchPhotosOverview })(Map);
