import React, { useState } from "react";

export default function LeverPuzzle() {
  const [puzzle, setPuzzle] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  console.log(puzzle);
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
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two, four: !puzzle.four })}>
          Lever 3
        </button>{" "}
        {puzzle.three === false ? "False" : "True"}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one })}>
          Lever 4
        </button>{" "}
        {puzzle.four === false ? "False" : "True"}
      </div>
    </div>
  );
}

