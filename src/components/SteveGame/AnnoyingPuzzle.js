import React, { useState, useEffect } from "react";
import '../../../public/CSS/Annoying.css'

export default function AnnoyingPuzzle() {
  const [pattern, setPattern] = useState({
    firstOne: Math.floor(Math.random() * 9) + 1,
    secondOne: Math.floor(Math.random() * 9) + 1,
    thirdOne: Math.floor(Math.random() * 4) + 1,
    resultOne: 0,
    firstTwo: Math.floor(Math.random() * 9) + 1,
    secondTwo: Math.floor(Math.random() * 9) + 1,
    thirdTwo: Math.floor(Math.random() * 4) + 1,
    resultTwo: 0,
    firstThree: Math.floor(Math.random() * 9) + 1,
    secondThree: Math.floor(Math.random() * 9) + 1,
    thirdThree: Math.floor(Math.random() * 4) + 1,
    resultThree: 0,
    firstFour: Math.floor(Math.random() * 9) + 1,
    secondFour: Math.floor(Math.random() * 9) + 1,
    thirdFour: Math.floor(Math.random() * 4) + 1,
    resultFour: "Guess pattern",
  });

  useEffect(() => {
    setPattern({
      ...pattern,
      resultOne: (pattern.firstOne - pattern.secondOne) * pattern.thirdOne,
      resultTwo: (pattern.firstTwo - pattern.secondTwo) * pattern.thirdTwo,
      resultThree: (pattern.firstThree - pattern.secondThree) * pattern.thirdThree,
    });
  }, []);

  // Win condition -- user will have to enter integer, if wrong, generate new numbers
  if (pattern.resultFour === (pattern.firstFour - pattern.secondFour) * pattern.thirdFour) {
    // useEffect to flip the puzzle to solved
  }

  return (
    <div>
      <div className='triangle'>
        <div>Top: {pattern.firstOne}</div>
        <div>Left: {pattern.secondOne}</div>
        <div>Right: {pattern.thirdOne}</div>
        <div>Result: {pattern.resultOne}</div>
      </div>
      <div className="triangle">
        <div>Top: {pattern.firstTwo}</div>
        <div>Left: {pattern.secondTwo}</div>
        <div>Right: {pattern.thirdTwo}</div>
        <div>Result: {pattern.resultTwo}</div>
      </div>
      <div className="triangle">
        <div>Top: {pattern.firstThree}</div>
        <div>Left: {pattern.secondThree}</div>
        <div>Right: {pattern.thirdThree}</div>
        <div>Result: {pattern.resultThree}</div>
      </div>
      <div className="triangle">
        <div>Top: {pattern.firstFour}</div>
        <div>Left: {pattern.secondFour}</div>
        <div>Right: {pattern.thirdFour}</div>
        <div>Result: {pattern.resultFour}</div>
      </div>
    </div>
  );
}
