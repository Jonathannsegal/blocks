import { Component } from 'react';
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as locationdot from '../../db/locationdot.json'
import ErrorScreen from '../../errors/ErrorScreen';
import MapOverlay from './MapOverlay';
import { RefreshTime } from '../../constants'
import * as mapAreaSource from '../../db/map.geojson';
import * as turf from '@turf/turf';
import mapboxgl from 'react-map-gl';
import { Avatar } from 'rsuite';
import firebase from "firebase/app";
import { db } from "../../firebase";
import { db as dbSnapshot } from "../../firebase/firebase";
import ObjectiveMarker from '../Create/objective-marker';

const locationdotOptions = {
    loop: true,
    autoplay: true,
    animationData: locationdot.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

var latitude1 = 0;
var latitude2 = 0;
var latitude3 = 0;
var longitude1 = 0;
var longitude2 = 0;
var longitude3 = 0;


const objectiveLayer = {
    id: 'objectives',
    type: 'circle',
    source: mapAreaSource,
    paint: {
        'circle-color': '#0000ff',
        'circle-opacity': 0,
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
        'fill-outline-color': '#ff0000'
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
        longitude1: -93.645,
        longitude2: 0,
        longitude3: 0,
        OBJECTIVES: [],
        dummy: 0,
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

    getPoints = () => {
        let geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                }
            ]
        };
        if (this.props.objectives != null) {
            for (var i = 0; i < this.props.objectives.length; i++) {
                let point = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [this.props.objectives[i].position.longitude, this.props.objectives[i].position.latitude]
                    }
                };
                geojson.features.push(point);
            }
        }
        return geojson;
    }


    updatePlayerGeoPoint = () => {
        if (this.props.coords.latitude != null && this.props.coords.longitude != null) {
            db.doUpdatePlayerPosition(this.props.currentGame, this.props.userId, new firebase.firestore.GeoPoint(
                this.props.coords.latitude,
                this.props.coords.longitude)
            );
            //console.log(this.props.coords.latitude,this.props.coords.longitude)
        }
    }


    getTeammates = () => {
        dbSnapshot.collection('games').doc(this.props.currentGame).collection('players').onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                //console.log(doc.id, " => ", doc.data());
                if (doc.id == "GBrTl2wHqNXsmRWC112x4SuleoA2") {
                    latitude1 = doc.data().position.latitude;
                    longitude1 = doc.data().position.longitude;
                    //console.log(latitude1, longitude1);
                }
                if (doc.id == "jdsSFvXOOzOovxhLarHSm70syKo2") {
                    latitude2 = doc.data().position.latitude;
                    longitude2 = doc.data().position.longitude;
                    //console.log(latitude2, longitude2);
                }
                if (doc.id == "nIU0RYydGfc0BPO6NymYqaPxyBy2") {
                    latitude3 = doc.data().position.latitude;
                    longitude3 = doc.data().position.longitude;
                    //console.log(latitude3, longitude3);
                }
            })
            //return querySnapshot;
        });
    }

    checkObjectives = () => {
        for (var i = 0; i < this.props.objectives.length; i++) {
            var center = [this.props.objectives[i].position.longitude, this.props.objectives[i].position.latitude];
            var circle = turf.circle(center, 0.014);
            var point = turf.point([this.props.coords.longitude, this.props.coords.latitude]);
            console.log(turf.inside(point, circle));
            if (turf.inside(point, circle)) {
							this.state.OBJECTIVES[i].color = "ff0000";
            }
        }
    }

    _renderCityMarker = (objective, index) => {
        return (
            <Marker key={`marker-${index}`} longitude={objective.longitude} latitude={objective.latitude} draggable={true} onDragEnd={event => this.updateObjectiveLocation(index, event.lngLat)}>
                <ObjectiveMarker size={15} color={this.state.OBJECTIVES[index].color} />
            </Marker>
        );
    };

    populateStateObjective = () => {
        for (var i = 0; i < this.props.objectives.length; i++) {
            let objectiveArray = [...this.state.OBJECTIVES];
            let marker = { "latitude": this.props.objectives[i].position.latitude, "longitude": this.props.objectives[i].position.longitude, "color":"00ff00" };
            objectiveArray.push(marker);
            this.state.OBJECTIVES = objectiveArray;
            this.setState({ dummy: this.state.dummy++ });
        }
    }

    componentDidMount() {
        this.getTeammates();
        this.populateStateObjective();

    }

    componentDidUpdate() {
        if (this.props.objectives.length != this.state.OBJECTIVES.length) {
            this.populateStateObjective();
        }
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
                    {this.state.OBJECTIVES.map(this._renderCityMarker)}
                    {this.updatePlayerGeoPoint()}
                    {this.checkObjectives()}
                    <Source type="geojson" data={this.getValues()}>
                        <Layer {...mapAreaLayer} />
                    </Source>
                    <Source type="geojson" data={this.getPoints()}>
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
