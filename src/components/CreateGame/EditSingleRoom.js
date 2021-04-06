import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleRoom } from '../../store/singeleRoom';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../public/CSS/EditSingleRoom.css';

const EditSingleRoom = (props) => {
  const { room } = props;
  const { puzzles } = room;
  //Need this value for line 118, the label where we are dynamically rendering our "top" css.
  const [showPrompt, setShowPrompt] = useState(false);
  const [puzzleDimensions, setPuzzleDimensions] = useState({});
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');
  const [puzzleText, setPuzzleText] = useState({});
  const [narrative, setNarrative] = useState('');
  const [buttonBoolean, setButtonBoolean] = useState(false);

  useEffect(() => {
    props.getRoom(props.match.params.id);
  }, []);

  useEffect(() => {
    if (puzzles && puzzles[0].roomdata) {
      //Calculating the height we need to subtract from the "top" value in our css

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

  const checkDimensionValues = (field, value) => {
    if (value < 0) {
      return true;
    }
    if ((field === 'top' && value > 790) || value < 0) {
      return true;
    }
    if ((field === 'left' && value > 1430) || value < 0) {
      return true;
    }
    return false;
  };

  const handleDimensionChanges = (e, puzzleId) => {
    e.preventDefault();
    setButtonBoolean(checkDimensionValues(e.target.name, e.target.value));
    const puzzleProp = { ...puzzleDimensions };
    puzzleProp[puzzleId][e.target.name] = e.target.value;
    setPuzzleDimensions(puzzleProp);
  };

  const handleSubmit = async (puzzleDims, roomId) => {
    console.log(puzzleText, 'puzzleText');
    await Promise.all([
      axios.put(`/api/rooms/${roomId}/roomdata`, {
        puzzleDimensions,
        puzzleText,
      }),
      axios.put(`/api/rooms/${roomId}`, { narrative }),
    ]);
    //This line would just push them back to whatever they were on before hitting "customize"
    //Naive solution for now. If they were to be on a random page, and Manually type in the URL to take them to edit a room, This will take them back to that random Page
    props.history.goBack();
  };

  if (!room.puzzles || Object.keys(puzzleDimensions).length === 0) {
    return <h1> Nothing to see here ! </h1>;
  }
  const styles = {
    backgroundImage: `url(${room.imgSrc})`,
    height: '559px',
    width: '1000px',
    position: 'relative',
    backgroundSize: 'cover',
    margin: '.5rem auto',
    border: '7px solid black',
  };
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

      <button onClick={() => setShowPrompt(true)}> INSTRUCTIONS </button>

      <div style={styles}>
        {room.puzzles.map((puzzle) => {
          return (
            <div
              style={{
                overflow: 'hidden',
                border: '4px solid red',
                position: 'absolute',
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
          );
        })}
        <Modal isOpen={showPrompt}>
          Edit the dimensions above to place your puzzle where you would like !
          The red box determines the clickable area for someone to access your
          puzzle ! Once the game is created the only thing that will be visible
          is your background image...
          <button onClick={() => setShowPrompt(false)}> Close </button>
        </Modal>
      </div>
      <div id="puzzle-info">
        {room.puzzles.map((puzzle) => {
          return (
            <div key={puzzle.id}>
              <div id="dimensions">
                <span style={{ fontWeight: 'bold', color: 'red' }}>
                  {puzzle.name} :{' '}
                </span>
                <label style={{ fontWeight: 'bolder', color: 'black' }}>
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
                <br></br>
                <label style={{ fontWeight: 'bolder', color: 'black' }}>
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
                <div>
                  <label style={{ fontWeight: 'bolder', color: 'black' }}>
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
                  <label style={{ fontWeight: 'bolder', color: 'black' }}>
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
                </div>
              </div>
              <div id="puzzle-text">
                <label htmlFor="puzzle-text">PUZZLE TEXT</label>
                <textarea
                  className="puzzle-text"
                  onChange={(e) =>
                    setPuzzleText((prev) => ({
                      ...prev,
                      [puzzle.id]: e.target.value,
                    }))
                  }
                  placeholder="include any text you would like with your puzzle here"
                  id="puzzle-text"
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        disabled={buttonBoolean}
        onClick={() => handleSubmit(puzzleDimensions, room.id)}
      >
        {' '}
        COMPLETE{' '}
      </button>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getRoom: fetchSingleRoom,
};

export default connect(mapState, mapDispatch)(EditSingleRoom);
