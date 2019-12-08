import { Component } from 'react';
import ReactMapGL, { Marker, FullscreenControl, GeolocateControl } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as pencil from '../../db/pencil.json'
import * as trash from '../../db/trash.json'
import * as resize from '../../db/resize.json'
import ErrorScreen from '../../errors/ErrorScreen';
import { RefreshTime } from '../../../src/constants'
import { Editor, EditorModes } from 'react-map-gl-draw';
import { getFeatureStyle, getEditHandleStyle } from './style';
import ObjectiveMarker from './objective-marker';
import * as turf from '@turf/turf';

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
                latitude: 42.03,
                longitude: -93.645,
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

    updateCoords = () => {
      this.state.viewport.latitude = this.props.coords.latitude;
      this.state.viewport.longitude = this.props.coords.longitude;
    }

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
                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showUserLocation={false}
                    />
                    {/* <div className="fullscreen">
                        <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        />
                    </div> */}
                    {/* <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                        <button
                            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
                            title="Polygon tool (p)"
                            onClick={() => this.setState({ mode: EditorModes.DRAW_POLYGON })}
                        > <Lottie
                                height={28}
                                width={28}
                                options={resizeOptions}
                                isClickToPauseDisabled={true}
                            /> </button>
                    </div> */}
                </div>
            </React.Fragment>
        );
    };

    _renderCityMarker = (objective, index) => {
        return (
            <Marker key={`marker-${index}`} longitude={objective.longitude} latitude={objective.latitude}>
                <ObjectiveMarker size={20} />
            </Marker>
        );
    };

    _createObjectives = () => {
      var minLat = this.state.geometry[0].geometry.coordinates[0][0][1];
      var maxLat = this.state.geometry[0].geometry.coordinates[0][0][1];
      var minLong = this.state.geometry[0].geometry.coordinates[0][0][0];
      var maxLong = this.state.geometry[0].geometry.coordinates[0][0][0];
      for(var i = 1; i < this.state.geometry[0].geometry.coordinates[0].length; i++){
        minLat = Math.min(minLat, this.state.geometry[0].geometry.coordinates[0][i][1]);
        maxLat = Math.max(maxLat, this.state.geometry[0].geometry.coordinates[0][i][1]);
        minLong = Math.min(minLong, this.state.geometry[0].geometry.coordinates[0][i][0]);
        maxLong = Math.max(maxLong, this.state.geometry[0].geometry.coordinates[0][i][0]);
      }
      for(var i = 0; i < 5; i++){
        let objectiveArray = [...this.state.OBJECTIVES];
        let marker = { "latitude": (Math.random() * (maxLat - minLat) + minLat), "longitude": (Math.random() * (maxLong - minLong) + minLong) };
        objectiveArray.push(marker);
        //this.setState({ OBJECTIVES: objectiveArray })
        this.state.OBJECTIVES = objectiveArray;
        this.setState({ dummy: 1});
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
      for(var i = 0; i < this.state.OBJECTIVES.length; i++){
        var point = turf.point([this.state.OBJECTIVES[i].longitude, this.state.OBJECTIVES[i].latitude]);
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
            let objectiveArray = [...this.state.OBJECTIVES];
            objectiveArray[i].longitude = (Math.random() * (maxLong - minLong) + minLong);
            objectiveArray[i].latitude = (Math.random() * (maxLat - minLat) + minLat);
            this.state.OBJECTIVES = objectiveArray
            point = turf.point([this.state.OBJECTIVES[i].longitude, this.state.OBJECTIVES[i].longitude]);
            count++;
            inside = turf.inside(point,polygon);
          }
        }
      }
    };

    componentDidMount(){

    }

    render() {
        const { mode } = this.state;
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
                {this.updateCoords()}
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
