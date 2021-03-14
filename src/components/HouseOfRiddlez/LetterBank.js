import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';

const LetterBank = (props) => {
  const [bank, setBank] = useState([{ livingRoomClues: 'clues' }]);

  // useEffect(() => {
  //   if (atticClues !== '') {
  //     setBank({ atticClues: atticClues });
  //   }
  // }, [atticClues]);

  console.log(props);

  return (
    <div className="bankContainer">
      <div>
        <h1 className="bankHeadings">House of Riddles</h1>
      </div>
      <div className="bankRow">
        <div className="bankDivs">
          <h3 className="bankHeadings">Directions </h3>
          <p className="bankParagraphs">
            Solve all the puzzles in each room of the house.
          </p>
          <br />
          <p className="bankParagraphs">
            When a puzzle is solved, a clue will be revealed in the Room's Bank.
          </p>
          <br />
          <p className="bankParagraphs">
            Complete all the puzzles in every room to solve the last riddle in
            the Main Room to
            <br />
            <br />
            escape the House of Riddlez.
          </p>
        </div>
        <div className="bankDivs">
          <h3 className="bankHeadings">Clues Bank</h3>
          <p className="bankParagraphs">Main Room = {props.mainRoom} </p>
          {/* not sure how to pass local state from one component to another */}
          <p className="bankParagraphs">Living Room = {}</p>
          <p className="bankParagraphs">Attic ={` ${props.atticClue1}`}</p>
        </div>
      </div>
    </div>
  );
};

export default LetterBank;
