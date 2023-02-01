import React, { useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'

import { defaultTheme } from './Theme'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
	const defaultProps = {
		center: {
			lat: 48.85400,
			lng: 2.36726
		},
		zoom: 15
	};

	const defaultOptions = {
		panControl: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		clickableIcons: false,
		keyboardShortcuts: false,
		scrollwheel: false,
		disableDoubleClickZoom: false,
		fullscreenControl: false,
		styles: defaultTheme
	}

	const positionResto = {
		lat: 48.85400,
		lng: 2.36726
	}
	return (
		// Important! Always set the container height explicitlyÒ
			<GoogleMapReact
				bootstrapURLKeys={{ key: API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				options={defaultOptions}
			>
				<AnyReactComponent
					lat={48.85400}
					lng={2.36726}
				/>
			</GoogleMapReact>
	);
}

export default Map
