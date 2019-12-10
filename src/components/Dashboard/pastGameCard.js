import React, { Component } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import PastGameCardOverlay from './pastGameCardOverlay'
import {
    Panel
} from 'rsuite';

class PastGameCard extends Component {
    constructor(props) {
        super(props);
    }

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
        if (this.props.shape != null) {
            if (this.props.shape != null) {
                let shape = [];
                for (var i = 0; i < this.props.shape.length; i++) {
                    shape.push(new Array(this.props.shape[i].longitude, this.props.shape[i].latitude));
                }
                geojson.features[0].geometry.coordinates.push(shape);
            }
        }
        return geojson;
    };

    render() {
        return (
            <React.Fragment>
                <Panel bodyFill shaded style={{ width: 300, height: 200, marginBottom: 30 }}>
                    <PastGameCardOverlay name={this.props.name} />
                    <ReactMapGL
                        width={"100vw"}
                        height={"35vh"}
                        latitude={42.02704516002396}
                        longitude={-93.64643096923828}
                        zoom={13}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxApiAccessToken={"pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A"}>
                        <Source type="geojson" data={this.getValues()}>
                            <Layer
                                id="map-area"
                                type="fill"
                                paint={{
                                    'fill-color': '#ff0000',
                                    'fill-opacity': 0.2,
                                    'fill-outline-color': '#8b0000'
                                }} />
                        </Source>
                    </ReactMapGL>
                </Panel>
            </React.Fragment>
        )
    }
}

export default PastGameCard