import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import ReactModal from 'react-modal';
import { connect, useSelector, useDispatch } from 'react-redux';
import { updatePuzzle } from '../../store/puzzle';
import { componentMapping } from '../Puzzles/puzzles';

const Home1 = (props) => {
  console.log('atticProps=>', props);

  const [atticPuzzle1, setAtticPuzzle1] = useState({
    solved: false,
    showModal: false,
  });
  const [atticPuzzle2, setAtticPuzzle2] = useState({
    solved: false,
    showModal: false,
  });
  const [atticPuzzle3, setAtticPuzzle3] = useState({
    solved: false,
    showModal: false,
  });

  const [atticClues, setAtticClues] = useState({
    clue1: 'I am attic puzzle clue 1',
    clue2: 'clue2',
    clue3: 'i am attic clue3',
  });

  //this is now coming from DB and is set in state and mapped to props
  const { game } = props;
  //dynamically rendering components based on which puzzles are in the array from the DB

  const Puzzle1 = (props) => {
    const Component = componentMapping[game.puzzles[0].name];
    return <Component {...props} />;
  };
  const Puzzle2 = (props) => {
    const Component = componentMapping[game.puzzles[1].name];
    return <Component {...props} />;
  };
  const Puzzle3 = (props) => {
    const Component = componentMapping[game.puzzles[2].name];
    return <Component {...props} />;
  };

  const showOpen =
    atticPuzzle1.showModal || atticPuzzle2.showModal || atticPuzzle3.showModal;

  const handleCloseClick = () => {
    useEffect(
      atticPuzzle1.showModal
        ? setAtticPuzzle1({ showModal: false })
        : atticPuzzle2.showModal
        ? setAtticPuzzle2({ showModal: false })
        : atticPuzzle3.showModal
        ? setAtticPuzzle3({ showModal: false })
        : null
    );
  };

  useEffect(() => {
    if (atticPuzzle1.isSolved) {
      setAtticPuzzle1({ ...atticPuzzle1 }, [atticPuzzle1]);
      console.log('this is solved useeffect', atticPuzzle1.solved);
    }
  });

  return (
    <div className="container">
      <ReactModal
        overlayClassName="OverlayHome1"
        className="modal"
        isOpen={showOpen}
        onRequestClose={() => {
          handleCloseClick();
        }}
      >
        <div className="modal-content">
          <button className="close" onClick={handleCloseClick}>
            x
          </button>
          {atticPuzzle1.showModal && (
            <Puzzle1
              solve={() =>
                setAtticPuzzle1(
                  {
                    ...atticPuzzle1,
                    solved: true,
                    showModal: false,
                  },
                  //i need to do a useEffect to update state but I get an error that it is called outside of the component, need help with this
                  console.log('this is solved', atticPuzzle1.solved)
                )
              }
            />
          )}
          {atticPuzzle2.showModal && (
            <Puzzle2
              solve={() =>
                setAtticPuzzle2({
                  ...atticPuzzle2,
                  solved: true,
                  showModal: false,
                })
              }
            />
          )}
          {atticPuzzle3.showModal && (
            <Puzzle3
              solve={() =>
                setAtticPuzzle3({
                  ...atticPuzzle3,
                  solved: true,
                  showModal: false,
                })
              }
            />
          )}
        </div>
      </ReactModal>

      <div className="background" id="home1">
        <button onClick={() => setAtticPuzzle1({ showModal: true })}>
          Puzzle 1
        </button>

        <button onClick={() => setAtticPuzzle2({ showModal: true })}>
          Puzzle 2
        </button>
        <button onClick={() => setAtticPuzzle3({ showModal: true })}>
          Puzzle 3
        </button>
      </div>
    </div>
  );
};

const mapToState = (state, routeProps) => {
  return state;
};

const mapToDispatch = {
  updatePuzzle: updatePuzzle,
};

export default connect(mapToState, mapToDispatch)(Home1);
