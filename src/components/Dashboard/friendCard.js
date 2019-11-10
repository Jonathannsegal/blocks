import React from 'react';
import {
    Panel,
    Placeholder,
    Avatar
} from 'rsuite';

const FriendCard = () => {
    return (
        <Panel shaded>
            <Avatar
                circle
                src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
            /> <span>Username</span>
            <p>Ames, IA</p>
            <p>365 T</p>
            {/* <Paragraph /> */}
        </Panel>
    )
}

export default FriendCard