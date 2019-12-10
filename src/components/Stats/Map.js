import React from 'react';
import ReactMapGL, { Source, Layer, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import bbox from '@turf/bbox';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 0,
                longitude: 0,
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
            <div>
                <ReactMapGL
                    ref={this._map}
                    width={"100vw"}
                    height={"35vh"}
                    {...viewport}
                    {...settings}
                    onViewportChange={this._updateViewport}
                    onLoad={setTimeout(() => this.setViewportonShape(), 2000)}
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