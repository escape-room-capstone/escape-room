import React, { useState, useEffect } from "react";
import "../../../public/CSS/LeverPuzzle.css";

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
    if (
      puzzle.one &&
      puzzle.two &&
      puzzle.three &&
      puzzle.four &&
      puzzle.five &&
      puzzle.six
    ) {
      setLeverPuzzleCompleted(true);
    }
  }, [puzzle]);

  return (
    <div id="lever-board">
      <div id="lever-stack">
        <p id="lock">{puzzle.one === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two })
          }
        ></button>{" "}
      </div>
      <div id="lever-stack">
        <p id="lock">{puzzle.two === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() =>
            setPuzzle({
              ...puzzle,
              two: !puzzle.two,
              three: !puzzle.three,
              four: !puzzle.four,
            })
          }
        ></button>{" "}
      </div>
      <div id="lever-stack">
        <p id="lock">{puzzle.three === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two })
          }
        ></button>{" "}
      </div>
      <div id="lever-stack">
        <p id="lock">{puzzle.four === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, five: !puzzle.five })
          }
        ></button>{" "}
      </div>
      <div id="lever-stack">
        <p id="lock">{puzzle.five === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() => setPuzzle({ ...puzzle, six: !puzzle.six })}
        ></button>{" "}
      </div>
      <div id="lever-stack">
        <p id="lock">{puzzle.six === false ? "Locked" : "Unlocked"}</p>
        <button
          className="leverButton"
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, six: !puzzle.six })
          }
        ></button>{" "}
      </div>
    </div>
  );
}
