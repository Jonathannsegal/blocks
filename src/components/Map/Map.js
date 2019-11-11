import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as locationdot from '../../db/locationdot.json'
import ErrorScreen from '../../errors/ErrorScreen';
import MapOverlay from './MapOverlay';
import { RefreshTime } from '../../../src/constants'

const locationdotOptions = {
	loop: true,
	autoplay: true,
	animationData: locationdot.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

class Map extends Component {
	state = {
		viewport: {
			width: '100vw',
			height: '100vh',
			latitude: 42.03,
			longitude: -93.645,
			zoom: 15
		}
	};

	render() {
		return !this.props.isGeolocationAvailable ? (
			<ErrorScreen message={`Your browser \n does not support \n Geolocation`} />
		) : !this.props.isGeolocationEnabled ? (
			<ErrorScreen message={`Geolocation \n is not \n enabled \n\n Big Sad`} />
		) : this.props.coords ? (
			<React.Fragment>
				<MapOverlay />
				<ReactMapGL
					mapStyle="mapbox://styles/mapbox/streets-v9"
					mapboxApiAccessToken="pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A"
					{...this.state.viewport}
					latitude={this.props.coords.latitude}
					longitude={this.props.coords.longitude}
					onViewportChange={(viewport) => this.setState({ viewport })}
				>
					<Marker latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}>
						<div className="locationContainer">
							<Lottie
								height={80}
								width={80}
								options={locationdotOptions}
								isClickToPauseDisabled={true}
							/>
						</div>
					</Marker>
					<style jsx>{`
					:global(body) {
						margin: 0;
					}
					.locationContainer {
						margin-left: -40px;
						margin-top: -40px;
					}
				`}</style>
				</ReactMapGL>
			</React.Fragment>
		) : (
						<div>Getting the location data&hellip; </div>
					);
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: RefreshTime.fiveSeconds,
	watchPosition: true
})(Map);
