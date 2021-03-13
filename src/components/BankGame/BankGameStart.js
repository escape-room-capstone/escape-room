import React, { useEffect, useState } from 'react';
import '../../../public/CSS/Bank.css';
import lock from '../../../public/Images/lock-2.png';
import unlocked from '../../../public/Images/unlocked.png';
import Modal from "react-modal";


//streetlight coordinates from top left of streetlight, to bottom right
//x1 150, y1 220
//x2 200, y2 310

const BankGameStart = (props) => {
  const [lightPuzzle, setLightPuzzle] = useState(false);
  const [doorPuzzle, setDoorPuzzle] = useState(false);
  const [points, setPoints] = useState(0);
  const [doorModal, setDoorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [codeEntered, setCodeEntered] = useState('');

  const customStyles = {
    content: {
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      left: 'auto',
      transform: 'translate(150%, 250%)',
    },
  };

  useEffect(()=>{
    console.log(lightPuzzle, doorPuzzle, points, showModal);
    if(lightPuzzle && doorPuzzle && points === 2){
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  })

  const handleChange = (e) => {
    setCodeEntered(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codeEntered === '1234') {
      alert("Correct!");
      setDoorModal(false);
      setDoorPuzzle(true);
      setPoints(points+1);      
    }
     else {
      alert("Incorrect!");
      setCodeEntered('');
    }
  };

  const nextRoom = (e) => {
    setShowModal(false);
    props.history.push("/Bankgame2");
  }
  //coordinates array will be an array in this format [ x1, y1, x2, y2]
  //so we will check to see if what we clicked is within the range of our x and y coordinates
  const clickedStreetlight = (x, y, coordinatesArr) => {
    return (
      x >= coordinatesArr[0] &&
      x <= coordinatesArr[2] &&
      y >= coordinatesArr[1] &&
      y <= coordinatesArr[3]
    );
  };
  // coordinates for streetlight 2 ---> 1260, 230, 1300, 310
  const handleClick = async(e) => {
    console.log(e.pageX, e.pageY);
    e.preventDefault();

    if(clickedStreetlight(e.pageX, e.pageY, [640, 430, 780, 730])){
      if(!doorPuzzle){
        setDoorModal(true);
      }
    }
    else if (
      (clickedStreetlight(e.pageX, e.pageY, [150, 200, 220, 310]) ||
      clickedStreetlight(e.pageX, e.pageY, [1260, 230, 1300, 310]) ) && !lightPuzzle      
    ) {
      const streetlightPrompt = window.prompt("What is always coming, but never arrives?");
      
       if(streetlightPrompt === null){
         return window.alert("Are you sure you want to cancel? You really need to solve this riddle to get inside...");
       }

       if(streetlightPrompt.toLowerCase() === "tomorrow"){  
         window.alert("That's correct");    
        setLightPuzzle(true);
        setPoints(points+1);
      } 
      else {
        window.alert(
          "Sorry that's incorrect."
        );
      }
    }


  };


  return <div className="mainContainer">
    <div className="bankGame" style={ lightPuzzle ? { backgroundColor : "black"} : {}} onClick={handleClick}><p style={{paddingTop:"100px", paddingLeft:"20px"}}>1234</p></div>
    <div className="lock"> 
    <img src={lightPuzzle ? unlocked : lock} />
    <img src={doorPuzzle ? unlocked: lock} />
     </div>
     <Modal style={customStyles} isOpen={doorModal}>
       <p>
         The door is locked... what is the code?
       </p>
       <form onSubmit={handleSubmit}>
          <label>
            Enter Code :
            <input style={{ marginLeft: "10px", marginRight: "10px" }} value={codeEntered} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button  style={{ marginTop : "10px" }} onClick={()=>setDoorModal(false)}>Close</button>
     </Modal>
     <Modal style={customStyles} isOpen={showModal}>
        <button className="goNextButton" onClick={nextRoom}>Next Room</button>
      </Modal>
  </div>;
};

export default BankGameStart;
