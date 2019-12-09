import React, { PureComponent } from 'react';


export default class ObjectiveMarker extends PureComponent {
    render() {
        const { size = 10 , color = "ff0000"} = this.props;

        return (
            <svg
            height={size*2}
            width={size*2}
            >
                <circle cx={size} cy={size} r={size} fill={color} opacity={0.5}/>
            </svg>
        );
    }
}
