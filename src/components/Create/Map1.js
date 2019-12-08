import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import ObjectiveMarker from './objective-marker'

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

    pushToArray(numberOfObjectives) {
        let marker = { "latitude": 42.02835217565519, "longitude": -93.64235401153564 };
        this.setState({ OBJECTIVES: this.state.OBJECTIVES.concat(marker) });
    };

    render() {
        return (
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
                </ReactMapGL>
            </React.Fragment >
        )
    }
}
export default Map