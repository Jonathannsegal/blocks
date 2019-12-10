import React, { Component } from 'react';
import ReactMapGl, { Source, Layer, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import PastGameCardOverlay from './pastGameCardOverlay';
import bbox from '@turf/bbox';
import {
    Panel
} from 'rsuite';
const TOKEN = 'pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A';

class PastGameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 42.02704516002396,
                longitude: -93.64643096923828,
                zoom: 11,
                bearing: 0,
                pitch: 0
            },
            interactionState: {},
            settings: {
                dragPan: true,
                dragRotate: true,
                scrollZoom: true,
                touchZoom: true,
                touchRotate: true,
                keyboard: true,
                doubleClickZoom: true
            },
            viewSet: false
        };

        this._map = React.createRef();
    }

    getValues = () => {
        let geojson = {
            type: 'FeatureCollection',
            features: [{
                geometry: {
                    type: 'Polygon',
                    coordinates: []
                },
                properties: {},
                type: 'Feature'
            }]
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

    _updateViewport = viewport => {
        this.setState({ viewport });
    };

    setViewportonShape() {
        const feature = this.getValues().features[0];
        if (feature) {
            if (this.state.viewport.height) {
                if (this.state.viewSet == false) {
                    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
                    const viewport = new WebMercatorViewport(this.state.viewport);
                    const { longitude, latitude, zoom } = viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                        padding: 40
                    });
                    this.setState({
                        viewport: {
                            ...this.state.viewport,
                            longitude,
                            latitude,
                            zoom,
                            transitionInterpolator: new LinearInterpolator({}),
                            transitionDuration: 1
                        }
                    });
                    this.setState({
                        settings: {
                            dragPan: false,
                            dragRotate: false,
                            scrollZoom: false,
                            touchZoom: false,
                            touchRotate: false,
                            keyboard: false,
                            doubleClickZoom: false,
                            minZoom: zoom,
                            maxZoom: zoom
                        },
                    })
                    this.setState({ viewSet: true });
                }
            }
        }
    };

    render() {
        const { viewport, settings } = this.state;
        return (
            <React.Fragment>
                <Panel bodyFill shaded style={{ width: 300, height: 200, marginBottom: 30 }}>
                    <PastGameCardOverlay name={this.props.name} />
                    <ReactMapGl
                        ref={this._map}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        {...viewport}
                        {...settings}
                        width="75vw"
                        height="35vh"
                        onLoad={setTimeout(() => this.setViewportonShape(), 1)}
                        onViewportChange={this._updateViewport}
                        mapboxApiAccessToken={TOKEN}
                    >
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
                    </ReactMapGl>
                </Panel>
            </React.Fragment>
        );
    }
}

export default PastGameCard