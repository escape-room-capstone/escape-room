import React from 'react';

export const ClueOne = (props) => {
  return (
    <div>
      SOLVE THIS CLUE
      <br></br>
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const ClueTwo = (props) => {
  return (
    <div>
      SOLVE PUZZLE TWO
      <br></br>
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const ClueThree = (props) => {
  return (
    <div>
      SOLVE PUZZLE THREE
      <br></br>
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};
