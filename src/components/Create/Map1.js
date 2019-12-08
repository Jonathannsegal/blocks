import { Component } from 'react';
import ReactMapGL, { Marker, FullscreenControl, GeolocateControl } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import ErrorScreen from '../../errors/ErrorScreen';
import { RefreshTime } from '../../../src/constants'
import ObjectiveMarker from './objective-marker';

// const OBJECTIVES =
//     [
//         // { "latitude": 42.02430352774402, "longitude": -93.65042209625244 },
//         // { "latitude": 42.02232692880542, "longitude": -93.64265441894531 },
//         // { "latitude": 42.028670955879136, "longitude": -93.64647388458252 },
//         // { "latitude": 42.02691764486515, "longitude": -93.64977836608887 },
//         // { "latitude": 42.02385720432251, "longitude": -93.63823413848877 },
//         // { "latitude": 42.02624818608508, "longitude": -93.64651679992676 }
//     ];

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: '100%',
                height: '100%',
                latitude: 42.03,
                longitude: -93.645,
                zoom: 14
            },
            OBJECTIVES: []
        };
    }
    _renderCityMarker = (objective, index) => {
        return (
            <Marker key={`marker-${index}`} longitude={objective.longitude} latitude={objective.latitude}>
                <ObjectiveMarker size={20} />
            </Marker>
        );
    };

    pushToArray = () => {
        let marker = { "latitude": 42.02835217565519, "longitude": -93.64235401153564 };
        this.setState({ OBJECTIVES: this.state.OBJECTIVES.concat(marker) });
    };

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
                    width="100%"
                    height="100%"
                    onViewportChange={(viewport) => this.setState({ viewport })}
                >
                    {this.state.OBJECTIVES.map(this._renderCityMarker)}
                    <button onClick={() => this.pushToArray()}>push marker</button>

                </ReactMapGL>
            </React.Fragment >
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