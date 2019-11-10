import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import {
	Content,
	FlexboxGrid
} from 'rsuite';
import * as locationdot from '../../db/locationdot.json'
import * as nolocation from '../../db/nolocation.json'
import MapOverlay from './MapOverlay';

const locationdotOptions = {
	loop: true,
	autoplay: true,
	animationData: locationdot.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const nolocationOptions = {
	loop: true,
	autoplay: true,
	animationData: nolocation.default,
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
			<div>Your browser does not support Geolocation</div>
		) : !this.props.isGeolocationEnabled ? (
			<React.Fragment>
				<Content>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={18}>
							<br /><br /><br />
							<Lottie
								options={nolocationOptions}
								isClickToPauseDisabled={true}
							/>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item colspan={17}>
							<br /><br />
							<FlexboxGrid justify="center">
								<FlexboxGrid.Item>
									<h2 className="center">Geolocation <br /> is not <br />enabled <br /><br />Big Sad</h2>
								</FlexboxGrid.Item>
							</FlexboxGrid>
							<br />
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Content>
				<style jsx>{`
				.center{
					text-align: center;
				}
		`}</style>
			</React.Fragment>

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
	userDecisionTimeout: 5000,
	watchPosition: true
})(Map);
