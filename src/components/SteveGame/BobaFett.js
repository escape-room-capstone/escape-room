import React, { useState } from 'react'
import '../../../public/style.css'

export default function BobaFett() {
    return (
        <div className='bobaBg'>
            <h1>You are Boba Fett, the galaxy's most feared bounty hunter, and son of the legendary Mandalorian Jango Fett.</h1>
            <p>In a battle with a nosy Jedi your ship, Slave 1, has sustained critical damage.</p>
            <p>The Jedi is safely frozen in your carbonite transport system, so it's time to fix the ship.</p>
            <p>You have 10 minutes to make all necessary repairs, or this is one bounty you won't cash in on.</p>
            <img src='https://www.thedentedhelmet.com/forums/attachments/screenshot0186-jpg.10867/' id='bobaImage'/>
            <button id='controls'>Example Button</button>
        </div>
    )
}

/* Lever Puzzle */
function LeverPuzzle() {
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