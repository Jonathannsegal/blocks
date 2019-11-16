import { Component } from 'react';
import ReactMapGL, { FullscreenControl } from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import Lottie from 'react-lottie'
import * as pencil from '../../db/pencil.json'
import * as trash from '../../db/trash.json'
import * as resize from '../../db/resize.json'
import ErrorScreen from '../../errors/ErrorScreen';
import { RefreshTime } from '../../../src/constants'
import { Editor, EditorModes } from 'react-map-gl-draw';
import { getFeatureStyle, getEditHandleStyle } from './style';

const pencilOptions = {
    loop: true,
    autoplay: true,
    animationData: pencil.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

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
    state = {
        viewport: {
            width: '100%',
            height: '100%',
            latitude: 42.03,
            longitude: -93.645,
            zoom: 14
        },
        mode: EditorModes.READ_ONLY
    };

    _updateViewport = viewport => {
        this.setState({ viewport });
    };

    _onSelect = options => {
        this.setState({ selectedFeatureIndex: options && options.selectedFeatureIndex });
    };

    _onUpdate = ({ editType }) => {
        if (editType === 'addFeature') {
            this.setState({
                mode: EditorModes.EDITING
            });
        }
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
