import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { geolocated } from 'react-geolocated';

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
			<div>Your browser does not support Geolocation</div>
		) : !this.props.isGeolocationEnabled ? (
			<div>Geolocation is not enabled</div>
		) : this.props.coords ? (
			<ReactMapGL
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxApiAccessToken="pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A"
				{...this.state.viewport}
				latitude={this.props.coords.latitude}
				longitude={this.props.coords.longitude}
				onViewportChange={(viewport) => this.setState({ viewport })}
			>
				<Marker latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}>
					<div className="yellow-box" />
				</Marker>
				<style jsx>{`
					:global(body) {
						margin: 0;
					}
					.yellow-box {
						background-color: #0000ff;
						width: 5px;
						height: 5px;
					}
				`}</style>
			</ReactMapGL>
		) : (
						<div>Getting the location data&hellip; </div>
					);
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: 5000,
	watchPosition: true
})(Map);
