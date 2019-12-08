import { Component } from 'react';
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as locationdot from '../../db/locationdot.json'
import ErrorScreen from '../../errors/ErrorScreen';
import MapOverlay from './MapOverlay';
import { RefreshTime } from '../../../src/constants';
import * as mapAreaSource from '../../db/map.geojson';
import * as turf from '@turf/turf';
import mapboxgl from 'react-map-gl';
import { Avatar } from 'rsuite';
import firebase from "firebase/app";
import { db } from "../../firebase";
import { db as dbSnapshot} from "../../firebase/firebase";

const locationdotOptions = {
	loop: true,
	autoplay: true,
	animationData: locationdot.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

var objectiveArray = [];
var latitude1= 0;
var latitude2= 0;
var latitude3= 0;
var longitude1=0;
var longitude2=0;
var longitude3=0;


const objectiveLayer = {
	id: 'objectives',
	type: 'circle',
	source: mapAreaSource,
	paint: {
		'circle-color': '#0000ff',
		'circle-opacity': 0.5,
		'circle-radius': 15,
	}
}

const mapAreaLayer = {
	id: 'map-area',
	type: 'fill',
	source: mapAreaSource,
	paint: {
		'fill-color': '#ff0000',
		'fill-opacity': 0.2,
		'fill-outline-color': '#000000'
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
			},
			latitude1: 42.03,
			latitude2: 0,
			latitude3: 0,
			longitude1:-93.645,
			longitude2:0,
			longitude3:0,
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

	getPoints = (index) => {
		let geojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry:{
							type: 'Point',
							coordinates: [objectiveArray[index][0], objectiveArray[index][1]]
					}
				}
			]
		};
		for(var i = 1; i < objectiveArray.length; i++){
			let point = {
					type: 'Feature',
					properties: {},
					geometry:{
							type: 'Point',
							coordinates: [objectiveArray[i][0], objectiveArray[i][1]]
					}
			};
			geojson.features.push(point);
		}
		return geojson;
	}

	updatePlayerGeoPoint = () => {
		if(this.props.coords.latitude != null && this.props.coords.longitude != null){
			db.doUpdatePlayerPosition( this.props.currentGame, this.props.userId,new firebase.firestore.GeoPoint(
					this.props.coords.latitude,
					this.props.coords.longitude)
			);
			//console.log(this.props.coords.latitude,this.props.coords.longitude)
		}
	}


		getTeammates = () =>{
		  dbSnapshot.collection('games').doc(this.props.currentGame).collection('players').onSnapshot(function(querySnapshot) {
		    querySnapshot.forEach(function(doc){
		      //console.log(doc.id, " => ", doc.data());
					if(doc.id == "GBrTl2wHqNXsmRWC112x4SuleoA2"){
						latitude1 = doc.data().position.latitude;
						longitude1= doc.data().position.longitude;
						//console.log(latitude1, longitude1);
					}
					if(doc.id == "jdsSFvXOOzOovxhLarHSm70syKo2"){
						latitude2 = doc.data().position.latitude;
						longitude2= doc.data().position.longitude;
						//console.log(latitude2, longitude2);
					}
					if(doc.id == "nIU0RYydGfc0BPO6NymYqaPxyBy2"){
						latitude3 = doc.data().position.latitude;
						longitude3 = doc.data().position.longitude;
						//console.log(latitude3, longitude3);
					}
		    })
		    //return querySnapshot;
		  });
		}

		checkObjectives = () => {
			for(var i = 0; i < objectiveArray.length; i++){
				var center = [objectiveArray[i][0], objectiveArray[i][1]];
				var circle = turf.circle(center, 0.014);
				var point = turf.point([this.props.coords.longitude, this.props.coords.latitude]);
				//console.log(turf.inside(point, circle));
				if(turf.inside(point, circle)){
					
				}
			}
		}


	_createObjectives = () => {
		var minLat = this.props.gameValues.shape[0].latitude;
		var maxLat = this.props.gameValues.shape[0].latitude;
		var minLong = this.props.gameValues.shape[0].longitude;
		var maxLong = this.props.gameValues.shape[0].longitude;
		for(var i = 1; i < this.props.gameValues.shape.length; i++){
			minLat = Math.min(minLat, this.props.gameValues.shape[i].latitude);
			maxLat = Math.max(maxLat, this.props.gameValues.shape[i].latitude);
			minLong = Math.min(minLong, this.props.gameValues.shape[i].longitude);
			maxLong = Math.max(maxLong, this.props.gameValues.shape[i].longitude);
		}
		for(var i = 0; i < 3; i ++){
			objectiveArray.push([(Math.random() * (maxLong - minLong) + minLong),(Math.random() * (maxLat - minLat) + minLat) ]);
		}
		let shape1 = [];
		let shape2 = [];
		for (var i = 0; i < this.props.gameValues.shape.length; i++) {
				shape1.push(new Array(this.props.gameValues.shape[i].longitude, this.props.gameValues.shape[i].latitude));
		}
		shape2.push(shape1);
		var polygon = turf.polygon(shape2);
		//console.log(objectiveArray);
		//console.log(turf.pointsWithinPolygon(turfPoints, polygon));
		for(var i = 0; i < objectiveArray.length; i++){
			var point = turf.point([objectiveArray[i][0], objectiveArray[i][1]]);
			if(turf.inside(point,polygon)){
				continue;
			}
			else{
				var inside = false;
				var count = 0;
				while(inside == false){
					if(count == 50){
						inside = true;
						break;
					}
					objectiveArray[i][0] = (Math.random() * (maxLong - minLong) + minLong);
					objectiveArray[i][1] = (Math.random() * (maxLat - minLat) + minLat);
					point = turf.point([objectiveArray[i][0], objectiveArray[i][1]]);
					count++;
					inside = turf.inside(point,polygon);
				}
			}
		}
	};

	componentDidMount(){
		this._createObjectives();
		this.getTeammates();
	}

	componentDidUpdate(){
	}

	render() {
		return !this.props.isGeolocationAvailable ? (
			<ErrorScreen message={`Your browser \n does not support \n Geolocation`} />
		) : !this.props.isGeolocationEnabled ? (
			<ErrorScreen message={`Geolocation \n is not \n enabled \n\n Big Sad`} />
		) : this.props.coords ? (
			<React.Fragment>
				<ReactMapGL
					mapStyle="mapbox://styles/mapbox/streets-v9"
					mapboxApiAccessToken="pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A"
					{...this.state.viewport}
					latitude={this.props.coords.latitude}
					longitude={this.props.coords.longitude}
					zoom={16}
					onViewportChange={(viewport) => this.setState({ viewport })}
				>
				{this.updatePlayerGeoPoint()}
				  <button onClick={() => this.checkObjectives()}>push marker</button>
					<Source type="geojson" data={this.getValues()}>
						<Layer {...mapAreaLayer} />
					</Source>
					<Source type="geojson" data={this.getPoints(0)}>
						<Layer {...objectiveLayer} />
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
								height={60}
								width={60}
								options={locationdotOptions}
								isClickToPauseDisabled={true}
							/>
						</div>
					</Marker>
					<Marker latitude={latitude1} longitude={longitude1}>
						{/* <div className="avatarContainer">
							<Avatar
								circle
								size="sm"
								src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
							/>
						</div> */}
						<div className="locationContainer">
							<Lottie
								height={60}
								width={60}
								options={locationdotOptions}
								isClickToPauseDisabled={true}
							/>
						</div>
					</Marker>
					<Marker latitude={latitude2} longitude={longitude2}>
						{/* <div className="avatarContainer">
							<Avatar
								circle
								size="sm"
								src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
							/>
						</div> */}
						<div className="locationContainer">
							<Lottie
								height={60}
								width={60}
								options={locationdotOptions}
								isClickToPauseDisabled={true}
							/>
						</div>
					</Marker>
					<Marker latitude={latitude3} longitude={longitude3}>
						{/* <div className="avatarContainer">
							<Avatar
								circle
								size="sm"
								src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
							/>
						</div> */}
						<div className="locationContainer">
							<Lottie
								height={60}
								width={60}
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
						margin-left: -30px;
						margin-top: -30px;
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
