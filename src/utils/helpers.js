//helper function that takes a clueNum and sets the clue.show to be false, clue.solved to be true,
//and showModal to be false (may need to change later if we don't want modal to close with solving a clue)
export const setSolved = (clue) => {
  setRoom((prevRoom) => {
    return {
      ...prevRoom,
      showModal: false,
      clues: {
        ...prevRoom.clues,
        [clue]: {
          show: false,
          solved: true,
        },
      },
    };
  });
};

//helper function that takes a clueNumber and sets showModal:true and sets the status of the clue.show to be true
export const show = (clue) => {
  setRoom((prevRoom) => {
    return {
      ...prevRoom,
      showModal: true,
      clues: {
        ...prevRoom.clues,
        [clue]: {
          ...prevRoom.clues[clue],
          show: true,
        },
      },
    };
  });
};

// styles for modal
export const customStyles = {
  content: {
    width: '50%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
