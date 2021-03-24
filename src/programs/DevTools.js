import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** SET UP NOTES **
// DevTools - to be added into route and render above all rooms
// The props for this helper will come from the component where it is rendered
// They need to be standardized with as follows: 
// - 

const DevTools = ({ activeGame, activeLevel, activeRoom, activeImage }) => {
    return (
        <div>
            <p>DevTools</p>
            {/* <p>Current Game: id {activeGame.id} - name {activeGame.title}</p>
            <p>Current Level: id {activeLevel.id} - name {activeLevel.name}</p>
            <p>Current Room: id {activeRoom.id} - name {activeRoom.name}</p>
            <p>Current Image: id {activeImage.id} - name {activeImage.name}</p> */}
        </div>
    )
}

export default DevTools;