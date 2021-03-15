import React, { useState, useEffect } from "react";
import "../../../public/CSS/MagicSquare.css";

export default function MagicSquarePuzzle({ setMagicSquarePuzzleCompleted }) {
  const [square, setSquare] = useState({
    one: 0,
    two: 1,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0,
  });

  let status = "Ship defenses are currently offline.";
  if(      parseInt(square.one) === 8 &&
  parseInt(square.three) === 6 &&
  parseInt(square.four) === 3 &&
  parseInt(square.five) === 5 &&
  parseInt(square.six) === 7 &&
  parseInt(square.seven) === 4 &&
  parseInt(square.eight) === 9 &&
  parseInt(square.nine) === 2) {
      status = 'Ship defenses have been restored. You may exit this menu.'
  }


  useEffect(() => {
    if (
      parseInt(square.one) === 8 &&
      parseInt(square.three) === 6 &&
      parseInt(square.four) === 3 &&
      parseInt(square.five) === 5 &&
      parseInt(square.six) === 7 &&
      parseInt(square.seven) === 4 &&
      parseInt(square.eight) === 9 &&
      parseInt(square.nine) === 2
    ) {
      setMagicSquarePuzzleCompleted(true);
    }
  }, [square]);

  return (
    <>
      <div className='status'>{status}</div>
      <div className="grid-container">
        <div className="sq">
          <input
            value={square.one}
            onChange={(e) => setSquare({ ...square, one: e.target.value })}
            type="number"
            name="sqOne"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.two}
            readOnly
            type="number"
            name="sqTwo"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.three}
            onChange={(e) => setSquare({ ...square, three: e.target.value })}
            type="number"
            name="sqThree"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.four}
            onChange={(e) => setSquare({ ...square, four: e.target.value })}
            type="number"
            name="sqFour"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.five}
            onChange={(e) => setSquare({ ...square, five: e.target.value })}
            type="number"
            name="sqFive"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.six}
            onChange={(e) => setSquare({ ...square, six: e.target.value })}
            type="number"
            name="sqSix"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.seven}
            onChange={(e) => setSquare({ ...square, seven: e.target.value })}
            type="number"
            name="sqSeven"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.eight}
            onChange={(e) => setSquare({ ...square, eight: e.target.value })}
            type="number"
            name="sqEight"
            required
          />
        </div>
        <div className="sq">
          <input
            value={square.nine}
            onChange={(e) => setSquare({ ...square, nine: e.target.value })}
            type="number"
            name="sqNine"
            required
          />
        </div>
      </div>
    </>
  );
}
