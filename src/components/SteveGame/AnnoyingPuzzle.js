import React, { useState, useEffect } from "react";
import '../../../public/CSS/Annoying.css'

export default function AnnoyingPuzzle({ setAnnoyingPuzzleCompleted, setAnnoyingModalOpen }) {
  const [pattern, setPattern] = useState({
    firstOne: Math.floor(Math.random() * 4) + 6,
    secondOne: Math.floor(Math.random() * 5) + 1,
    thirdOne: Math.floor(Math.random() * 4) + 1,
    resultOne: 0,
    firstTwo: Math.floor(Math.random() * 4) + 6,
    secondTwo: Math.floor(Math.random() * 5) + 1,
    thirdTwo: Math.floor(Math.random() * 4) + 1,
    resultTwo: 0,
    firstThree: Math.floor(Math.random() * 4) + 6,
    secondThree: Math.floor(Math.random() * 5) + 1,
    thirdThree: Math.floor(Math.random() * 4) + 1,
    resultThree: 0,
    firstFour: Math.floor(Math.random() * 4) + 6,
    secondFour: Math.floor(Math.random() * 5) + 1,
    thirdFour: Math.floor(Math.random() * 4) + 1,
    resultFour: 1337,
  });

  // flip the status message so user knows they solved it
  let status = "Unsolved...";
  if (pattern.resultFour === (pattern.firstFour - pattern.secondFour) * pattern.thirdFour) {
    status = "Solved! It's now safe to close the window."
  }

  // sets initial state values like a componentDidMount
  useEffect(() => {
    setPattern({
      ...pattern,
      resultOne: (pattern.firstOne - pattern.secondOne) * pattern.thirdOne,
      resultTwo: (pattern.firstTwo - pattern.secondTwo) * pattern.thirdTwo,
      resultThree: (pattern.firstThree - pattern.secondThree) * pattern.thirdThree,
    });
  }, []);

  // Win condition -- user will have to enter integer, if wrong, generate new numbers
  useEffect(() => {
    if (pattern.resultFour === (pattern.firstFour - pattern.secondFour) * pattern.thirdFour) {
      setAnnoyingPuzzleCompleted(true);
      console.log("passed")
    }
  }, [pattern, setAnnoyingPuzzleCompleted])

  // setTimeout and reset timer if the modal closes
  useEffect(() => {
    const annoying = setTimeout(() => {
      setAnnoyingModalOpen(false)
    }, 30000)
    return () => {
      clearTimeout(annoying)
    };
  }, [])

  // onChange will set the value of the fourth result in state with the entered number
  const handleChange = (event) => {
    setPattern({...pattern, resultFour: Number(event.target.value)})
    console.log(typeof pattern.resultFour)
  }

  return (
    <div>
      <p>{status}</p>
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
        <div>Result: <input style={{width: '4rem'}} type='string' value={pattern.resultFour} onChange={handleChange}/></div>
      </div>
    </div>
  );
}
