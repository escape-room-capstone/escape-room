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
    resultFour: 0,
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
    }, 15000)
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
      <p style={{ fontSize: '40px', color: 'white' }}>{status}</p>
      <div id="game-div-boba">
      <div className='game-board'>
        <div className='box white'></div>
        <div className='box'>{pattern.firstOne}</div>
        <div className='box white'></div>
        <div className='box left-triangle'></div>
        <div className='box'>{pattern.resultOne}</div>
        <div className='box right-triangle'></div>
        <div className='box'>{pattern.secondOne}</div>
        <div className='box'></div>
        <div className='box'>{pattern.thirdOne}</div>
      </div>
      <div className='game-board'>
        <div className='box white'></div>
        <div className='box'>{pattern.firstTwo}</div>
        <div className='box white'></div>
        <div className='box left-triangle'></div>
        <div className='box'>{pattern.resultTwo}</div>
        <div className='box right-triangle'></div>
        <div className='box'>{pattern.secondTwo}</div>
        <div className='box'></div>
        <div className='box'>{pattern.thirdTwo}</div>
      </div>
      <div className='game-board'>
        <div className='box white'></div>
        <div className='box'>{pattern.firstThree}</div>
        <div className='box white'></div>
        <div className='box left-triangle'></div>
        <div className='box'>{pattern.resultThree}</div>
        <div className='box right-triangle'></div>
        <div className='box'>{pattern.secondThree}</div>
        <div className='box'></div>
        <div className='box'>{pattern.thirdThree}</div>
      </div>
      <div className='game-board'>
        <div className='box white'></div>
        <div className='box'>{pattern.firstFour}</div>
        <div className='box white'></div>
        <div className='box left-triangle'></div>
        <div className='box'><input style={{width: '42px', height: '43px', background: '#444', borderColor: 'transparent', color: '#AAA', fontSize: '15px'}} type='string' value={pattern.resultFour} onChange={handleChange}/></div>
        <div className='box right-triangle'></div>
        <div className='box'>{pattern.secondFour}</div>
        <div className='box'></div>
        <div className='box'>{pattern.thirdFour}</div>
      </div>
      </div>
    </div>
  );
}
