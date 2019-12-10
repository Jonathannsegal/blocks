import React, { Component } from 'react';
require('rsuite/lib/styles/index.less');

class pastGameCardOverlay extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="overlay">
                    <div className="margin">
                        <h5>{this.props.name}</h5>
                    </div>
                </div>
                <style jsx>{`
                .overlay{
                    position: fixed;
                    width: 100%;
                    z-index: 99;
                    background-color: transparent;
                }
                .margin{
                    color: black;
                    margin: 1em;
                }
		`}</style>
            </React.Fragment >
        );
    }
}

export default pastGameCardOverlay;

