import { Component } from 'react';
import ReactMapGL, { Marker, FullscreenControl, GeolocateControl } from 'react-map-gl';
import Lottie from 'react-lottie'
import * as pencil from '../../db/pencil.json'
import * as trash from '../../db/trash.json'
import * as resize from '../../db/resize.json'
import { Editor, EditorModes } from 'react-map-gl-draw';
import { getFeatureStyle, getEditHandleStyle } from './style';
import ObjectiveMarker from './objective-marker';
import * as turf from '@turf/turf';
import {
    Icon
} from 'rsuite';
require('rsuite/lib/styles/index.less');

const pencilOptions = {
    loop: true,
    autoplay: true,
    animationData: pencil.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

var objectiveArray = [];

const trashOptions = {
    loop: true,
    autoplay: true,
    animationData: trash.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const resizeOptions = {
    loop: true,
    autoplay: true,
    animationData: resize.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: '100%',
                height: '100%',
                zoom: 14
            },
            OBJECTIVES: [],
            dummy: 0,
            mode: EditorModes.READ_ONLY,
            geometry: {},
        };
    }

    _updateViewport = viewport => {
        this.setState({ viewport });
    };

    _goToCurrentLocation = () => {
        if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    this.setState({
                        viewport: {
                            ...this.state.viewport,
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude
                        }
                    });
                }.bind(this)
            );
        }
    };

    _onUpdate = ({ editType }) => {
        if (editType === 'addFeature') {
            this.setState({
                mode: EditorModes.EDITING
            });
        }
        this.props.parentCallback(this._editorRef && this._editorRef.getFeatures());
        this.setState({
            geometry: this._editorRef && this._editorRef.getFeatures()
        });
    };

    _onDelete = () => {
        const selectedIndex = this.state.selectedFeatureIndex;
        if (selectedIndex !== null && selectedIndex >= 0) {
            this._editorRef.deleteFeatures(selectedIndex);
        }
    };


    _renderDrawTools = () => {
        return (
            <React.Fragment>
                <div className="mapboxgl-ctrl-top-left">
                    <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                        <button
                            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
                            title="Polygon tool (p)"
                            onClick={() => this.setState({ mode: EditorModes.DRAW_POLYGON })}
                        > <Lottie
                                height={28}
                                width={28}
                                options={pencilOptions}
                                isClickToPauseDisabled={true}
                            /> </button>
                        <button
                            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
                            title="Delete"
                            onClick={this._onDelete}
                        ><Lottie
                                height={22}
                                width={22}
                                options={trashOptions}
                                isClickToPauseDisabled={true}
                            /></button>
                    </div>
                </div>
                <div className="mapboxgl-ctrl-top-right">
                    <div className="fullscreen">
                        <FullscreenControl />
                    </div>
                    {/* <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                        <button
                            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
                            title="goToCurrentLocation"
                            onClick={() => this._goToCurrentLocation()}
                        >
                            <Icon size="lg" icon='compass' />
                        </button>
                    </div> */}
                </div>
            </React.Fragment>
        );
    };

    updateObjectiveLocation = (index, position) => {
        let objectiveArray = [...this.state.OBJECTIVES];
        objectiveArray[index].latitude = position[1];
        objectiveArray[index].longitude = position[0];
        this.state.OBJECTIVES = objectiveArray;
        this.setState({ dummy: this.state.dummy++ });
        this.props.anotherCallback(this.state.OBJECTIVES);
    }

    _renderCityMarker = (objective, index) => {
        return (
            <Marker key={`marker-${index}`} longitude={objective.longitude} latitude={objective.latitude} draggable={true} onDragEnd={event => this.updateObjectiveLocation(index, event.lngLat)}>
                <ObjectiveMarker size={20} />
            </Marker>
        );
    };

    _createObjectives = (objectiveNum) => {
        var minLat = this.state.geometry[0].geometry.coordinates[0][0][1];
        var maxLat = this.state.geometry[0].geometry.coordinates[0][0][1];
        var minLong = this.state.geometry[0].geometry.coordinates[0][0][0];
        var maxLong = this.state.geometry[0].geometry.coordinates[0][0][0];
        for (var i = 1; i < this.state.geometry[0].geometry.coordinates[0].length; i++) {
            minLat = Math.min(minLat, this.state.geometry[0].geometry.coordinates[0][i][1]);
            maxLat = Math.max(maxLat, this.state.geometry[0].geometry.coordinates[0][i][1]);
            minLong = Math.min(minLong, this.state.geometry[0].geometry.coordinates[0][i][0]);
            maxLong = Math.max(maxLong, this.state.geometry[0].geometry.coordinates[0][i][0]);
        }
        for (var i = 0; i < objectiveNum; i++) {
            let objectiveArray = [...this.state.OBJECTIVES];
            let marker = { "latitude": (Math.random() * (maxLat - minLat) + minLat), "longitude": (Math.random() * (maxLong - minLong) + minLong) };
            objectiveArray.push(marker);
            //this.setState({ OBJECTIVES: objectiveArray })
            this.state.OBJECTIVES = objectiveArray;
            this.setState({ dummy: this.state.dummy++ });
            //objectiveArray.push([(Math.random() * (maxLong - minLong) + minLong),(Math.random() * (maxLat - minLat) + minLat) ]);
        }
        let shape1 = [];
        let shape2 = [];
        for (var i = 0; i < this.state.geometry[0].geometry.coordinates[0].length; i++) {
            shape1.push(new Array(this.state.geometry[0].geometry.coordinates[0][i][0], this.state.geometry[0].geometry.coordinates[0][i][1]));
        }
        shape2.push(shape1);
        var polygon = turf.polygon(shape2);
        //console.log(objectiveArray);
        //console.log(turf.pointsWithinPolygon(turfPoints, polygon));
        for (var i = 0; i < this.state.OBJECTIVES.length; i++) {
            var point = turf.point([this.state.OBJECTIVES[i].longitude, this.state.OBJECTIVES[i].latitude]);
            if (turf.inside(point, polygon)) {
                continue;
            }
            else {
                var inside = false;
                var count = 0;
                while (inside == false) {
                    if (count == 100) {
                        inside = true;
                        break;
                    }
                    let objectiveArray = [...this.state.OBJECTIVES];
                    objectiveArray[i].longitude = (Math.random() * (maxLong - minLong) + minLong);
                    objectiveArray[i].latitude = (Math.random() * (maxLat - minLat) + minLat);
                    this.state.OBJECTIVES = objectiveArray
                    this.setState({ dummy: this.state.dummy++ });
                    point = turf.point([this.state.OBJECTIVES[i].longitude, this.state.OBJECTIVES[i].longitude]);
                    count++;
                    inside = turf.inside(point, polygon);
                }
            }
        }
        this.props.anotherCallback(this.state.OBJECTIVES);
    };

    componentDidMount() {
        this._goToCurrentLocation()
    }

    render() {
        const { mode } = this.state;
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
                    <Editor
                        ref={_ => (this._editorRef = _)}
                        style={{ width: '100%', height: '100%' }}
                        clickRadius={12}
                        mode={mode}
                        onSelect={this._onSelect}
                        onUpdate={this._onUpdate}
                        editHandleShape={'circle'}
                        featureStyle={getFeatureStyle}
                        editHandleStyle={getEditHandleStyle}
                    />
                    {this._renderDrawTools()}
                </ReactMapGL>
            </React.Fragment >
        );
    }
}

export default Map;
