import React, { useState, useEffect } from "react";

export default function LeverPuzzle({ setLeverPuzzleCompleted }) {
  const [puzzle, setPuzzle] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  });
  useEffect(() => {
    if (puzzle.one && puzzle.two && puzzle.three && puzzle.four && puzzle.five && puzzle.six) {
      setLeverPuzzleCompleted(true);
    }
  }, [puzzle])

  return (
    <div>
      <div>
        <button
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two })
          }
        >
          Lever 1
        </button>{" "}
        {puzzle.one === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, two: !puzzle.two, three: !puzzle.three, four: !puzzle.four })}>
          Lever 2
        </button>{" "}
        {puzzle.two === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two })}>
          Lever 3
        </button>{" "}
        {puzzle.three === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one, five: !puzzle.five })}>
          Lever 4
        </button>{" "}
        {puzzle.four === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, six: !puzzle.six })}>
          Lever 5
        </button>{" "}
        {puzzle.five === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one, six: !puzzle.six })}>
          Lever 6
        </button>{" "}
        {puzzle.six === false ? "False" : "True"}
      </div>
    </div>
  );
}

