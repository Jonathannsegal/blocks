import { Component } from 'react';
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as locationdot from '../../db/locationdot.json'
import ErrorScreen from '../../errors/ErrorScreen';
import MapOverlay from './MapOverlay';
import { RefreshTime } from '../../../src/constants'
import * as mapAreaSource from '../../db/map.geojson'
import {
	Avatar
} from 'rsuite';

const locationdotOptions = {
	loop: true,
	autoplay: true,
	animationData: locationdot.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};
var objectiveArray = new Array()
var temp = 0;



const mapAreaLayer = {
	id: 'map-area',
	type: 'fill',
	source: mapAreaSource,
	paint: {
		'fill-color': '#ff0000',
		'fill-opacity': 0.2,
		'fill-outline-color': '#8b0000'
	}
}

class Map extends Component {
	state = {
		viewport: {
			width: '100vw',
			height: '100vh',
			latitude: 42.03,
			longitude: -93.645,
			zoom: 16
		}
	};

	getValues = () => {
			let geojson = {
					type: 'FeatureCollection',
					features: [
							{
									type: 'Feature',
									properties: {},
									geometry: {
											type: 'Polygon',
											coordinates: [
													[
															[0, 0],
															[1, 1]
													]
											]
									}
							}
					]
			};
			if (this.props.gameValues != null) {
					if (this.props.gameValues.shape != null) {
							let shape = [];
							for (var i = 0; i < this.props.gameValues.shape.length; i++) {
									shape.push(new Array(this.props.gameValues.shape[i].longitude, this.props.gameValues.shape[i].latitude));
							}
							geojson.features[0].geometry.coordinates.push(shape);
					}
			}
			return geojson;
	};

	_createObjectives = () => {
		var minLat = 42.0227732629691;
		var maxLat = 42.030615480628065;
		var minLong = -93.65424156188965;
		var maxLong = -93.63643169403076;
		objectiveArray.push([(Math.random() * (maxLat - minLat) + minLat),(Math.random() * (maxLong - minLong) + minLong)]);
		console.log(objectiveArray);
	}


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
					<Source type="geojson" data={this.getValues}>
						<Layer {...mapAreaLayer} />
					</Source>
					<Marker latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}>
						{/* <div className="avatarContainer">
							<Avatar
								circle
								size="sm"
								src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
							/>
						</div> */}
						<div className="locationContainer">
							<Lottie
								height={100}
								width={100}
								options={locationdotOptions}
								isClickToPauseDisabled={true}
							/>
						</div>
					</Marker>
					<style jsx>{`
					:global(body) {
						margin: 0;
					}
					.avatarContainer {
						z-index: 10;
						position: absolute;
						margin-left: -14px;
						margin-top: -16.5px;
					}
					.locationContainer {
						z-index: 9;
						margin-left: -50px;
						margin-top: -50px;
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
