import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleRoom } from '../../store/singeleRoom';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../public/CSS/EditSingleRoom.css';

const EditSingleRoom = (props) => {
  const { room } = props;
  const { puzzles } = room;
  const [showPrompt, setShowPrompt] = useState(false);
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');
  const [puzzleDimensions, setPuzzleDimensions] = useState({});
  const [narrative, setNarrative] = useState('');
  const [goBack, setGoBack] = useState(false);
  useEffect(() => {
    if (goBack) {
      props.history.goBack();
    }
  }, [goBack]);
  useEffect(() => {
    props.getRoom(props.match.params.id);
  }, []);

  useEffect(() => {
    if (puzzles && puzzles[0].roomdata) {
      console.log(props, 'PROPPPERTIRESS');
      const puzzleDims = puzzles.reduce((dimensionsObj, currentPuzzle) => {
        dimensionsObj[currentPuzzle.id] = {
          top: currentPuzzle.roomdata ? currentPuzzle['roomdata'].top : '',
          left: currentPuzzle.roomdata ? currentPuzzle['roomdata'].left : '',
          width: currentPuzzle.roomdata ? currentPuzzle['roomdata'].width : '',
          height: currentPuzzle.roomdata
            ? currentPuzzle['roomdata'].height
            : '',
        };
        return dimensionsObj;
      }, {});
      setPuzzleDimensions(puzzleDims);
    }
  }, [props.room]);

  //GOAL : is to have an puzzleDimensions objects in my state,          SUCCESS
  //puzzleDimensions : {
  //                      1 : {
  //                         top : "150",
  //                         left : "600",
  //                         width: "70",
  //                         height: "20"
  //                       }

  //                       5 : {
  //                         top : "150",
  //                         left : "600",
  //                         width: "70",
  //                         height: "20"
  //                    }

  const handleDimensionChanges = (e, puzzleId) => {
    e.preventDefault();
    const puzzleProp = { ...puzzleDimensions };
    puzzleProp[puzzleId][e.target.name] = e.target.value;
    setPuzzleDimensions(puzzleProp);
  };

  const handleSubmit = async (puzzleDims, roomId) => {
    console.log(puzzleDims, 'puzzleDims');
    console.log(puzzleDimensions, 'puzzleDimensions');
    console.log(roomId);
    // await axios.put(`/api/rooms/${roomId}/roomdata`, {
    //   puzzleDimensions,
    // });
    await Promise.all([
      axios.put(`/api/rooms/${roomId}/roomdata`, {
        puzzleDimensions,
      }),
      axios.put(`/api/rooms/${roomId}`, { narrative }),
    ]);
    // setGoBack(true);
    //This line would just push them back to whatever they were on before hitting "customize"
    //Naive solution for now. If they were to be on a random page, and Manually type in the URL to take them to edit a room, This will take them back to that random Page
    // props.history.goBack();
    props.history.goBack();
  };

  if (!room.puzzles || Object.keys(puzzleDimensions).length === 0) {
    return <h1> Nothing to see here ! </h1>;
  }

  const styles = {
    backgroundImage: `url(${room.imgSrc})`,
    height: '800px',
    width: '1440px',
    position: 'relative',
    backgroundSize: 'cover',
    margin: '0 auto',
  };

  console.log(room.puzzles);

  return (
    <div id="edit-room">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <span className="narrative">EDIT ROOM NARRATIVE HERE</span> <br></br>
        <input
          className="narrative"
          placeholder="enter text/narrative for room here"
          onChange={(e) => setNarrative(e.target.value)}
        ></input>
      </div>
      <div style={styles}>
        <button onClick={() => setShowPrompt(true)}> INSTRUCTIONS </button>
        {room.puzzles.map((puzzle) => {
          return (
            <div key={puzzle.id}>
              <span style={{ fontWeight: 'bold', color: 'red' }}>
                {puzzle.name} :{' '}
              </span>
              <label style={{ fontWeight: 'bolder', color: 'chartreuse' }}>
                {' '}
                Distance from top{' '}
                <input
                  name="top"
                  type="text"
                  value={
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].top
                      : ''
                  }
                  onChange={(e, puzzleId) =>
                    handleDimensionChanges(e, puzzle.id)
                  }
                />
              </label>
              <label style={{ fontWeight: 'bolder', color: 'chartreuse' }}>
                {' '}
                Distance from left{' '}
                <input
                  name="left"
                  type="text"
                  value={
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].left
                      : ''
                  }
                  onChange={(e, puzzleId) =>
                    handleDimensionChanges(e, puzzle.id)
                  }
                />
              </label>
              <label style={{ fontWeight: 'bolder', color: 'chartreuse' }}>
                {' '}
                Width{' '}
                <input
                  type="text"
                  name="width"
                  value={
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].width
                      : ''
                  }
                  onChange={(e, puzzleId) =>
                    handleDimensionChanges(e, puzzle.id)
                  }
                />
              </label>
              <label style={{ fontWeight: 'bolder', color: 'chartreuse' }}>
                {' '}
                Height{' '}
                <input
                  type="text"
                  name="height"
                  value={
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].height
                      : ''
                  }
                  onChange={(e, puzzleId) =>
                    handleDimensionChanges(e, puzzle.id)
                  }
                />{' '}
              </label>
              <br />
              <br />
              <div
                style={{
                  overflow: 'hidden',
                  border: '4px solid red',
                  position: 'relative',
                  top: `${
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].top
                      : ''
                  }px`,
                  left: `${
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].left
                      : ''
                  }px`,
                  width: `${
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].width
                      : ''
                  }px`,
                  height: `${
                    puzzleDimensions[puzzle.id]
                      ? puzzleDimensions[puzzle.id].height
                      : ''
                  }px`,
                }}
                key={puzzle.id}
              >
                {' '}
                {puzzle.name}{' '}
              </div>
            </div>
          );
        })}
        <Modal isOpen={showPrompt}>
          Edit the dimensions above to place your puzzle where you would like !
          The red box determines the clickable area for someone to access your
          puzzle ! Once the game is created the only thing that will be visible
          is your background image... Add a narrative/text to the room, and any
          hints (up to 3) that you would like to give
          <button onClick={() => setShowPrompt(false)}> Close </button>
        </Modal>
        <button
          onClick={() => handleSubmit(puzzleDimensions, room.id, narrative)}
        >
          {' '}
          Submit{' '}
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getRoom: fetchSingleRoom,
};

export default connect(mapState, mapDispatch)(EditSingleRoom);
