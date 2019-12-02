import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

class Map extends React.Component {
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

    render() {
        return (
            <div>
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
            </div >
        );
    }
}
export default Map;