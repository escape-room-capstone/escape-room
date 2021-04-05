import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveGame, getActiveRoom } from '../../store/dynamic.js';
// import DevTools from '../../programs/DevTools'

// Dynamic game loading component
const SingleRoom = (props) => {
  // Map state to props && create a map dispatch variable
  const { activeGame } = useSelector((state) => state.dg);
  const { activeRoom } = useSelector((state) => state.dg);
  const dispatch = useDispatch();

  // Set local state -- for now just to use to move around the dynamic game
  const [selectedGameId, setSelectedGame] = useState(1);
  const [selectedRoomId, setSelectedRoom] = useState(1);

  let gameId = 1; // -- for now just
  let roomId = selectedRoomId;

  // Fetch the game from DynamincGame redux
  useEffect(() => {
    dispatch(getActiveGame(gameId)), dispatch(getActiveRoom(gameId, roomId));
  }, [gameId, roomId]);

  //console.log(activeRoom);

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  return (
    <div className="dg-singleroom">
      {/* logic below prevents the code to render before the state is filled with data */}
      {activeRoom.id && (
        <div className="dg-singleroom">
          <div id="room-selector">
            Active Game: {activeGame.title} | ActiveRoom: {activeRoom.name}
            <input
              id="select-room"
              type="number"
              value={roomId}
              min="1"
              max={activeGame.rooms.length}
              onChange={(e) => handleRoomChange(e)}
            ></input>
          </div>
          <hr />

          <div className="dg-singleroom-programs">
            [ In-game programs will appear here ]
          </div>
          <hr />

          <div className="dg-singleroom-title-text">
            [ Text generated for the room will be rendered here]{' '}
          </div>
          <hr />

          <div className="dg-singleroom-body">
            <img src={activeRoom.images[0].src}></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRoom;
