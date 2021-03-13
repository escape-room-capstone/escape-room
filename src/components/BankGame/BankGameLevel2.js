import React, { useEffect, useState } from 'react';
import Gun from '../../../public/Images/gun.png';
import Key from '../../../public/Images/key.png';
import lock from '../../../public/Images/lock-2.png';
import unlocked from '../../../public/Images/unlocked.png';
import Modal from 'react-modal';
import '../../../public/CSS/Bank.css';

//streetlight coordinates from top left of streetlight, to bottom right
//x1 150, y1 220
//x2 200, y2 310

const BankGameLevel2 = (props) => {

  const customStyles = {
    content: {
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      left: 'auto',
      transform : 'translate(125%, 70%)'
    },
  };

  const customStyles2 = {
    content: {
      position: "fixed",
      width: "500px",
      height: "100px",
      bottom: "calc(50% - 50px)",
      left: "calc(50% - 250px)"
    }
  };

  //for weapon modal and key modal
  const [showWeapon, setShowWeapon] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [weaponPuzzle, setWeaponPuzzle] = useState(false);
  const [keyPuzzle, setKeyPuzzle] = useState(false);
  const [nextRoomModal, setNRModal] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(()=>{
    console.log(weaponPuzzle, keyPuzzle, points)
    if(weaponPuzzle && keyPuzzle && points === 2){
      setNRModal(true);
    }
  })

  const nextRoom = (e) => {
    setNRModal(false);
    props.history.push("/Bankgame3");
  }

  const closeWeaponModal = (e) => {
    setShowWeapon(false)
    setPoints(points+1);
  }

  const closeKeyModal = (e) => {
    setShowKey(false);
    setPoints(points+1);
  }

  const clickedClue = (x, y, coordinatesArr) => {
    return (
      x >= coordinatesArr[0] &&
      x <= coordinatesArr[2] &&
      y >= coordinatesArr[1] &&
      y <= coordinatesArr[3]
    );
  };
  //Keys [375, 605, 410, 635]
  //[90, 40, 105, 55]
  const handleClickedClue = (e) => {
    console.log(e.pageX, e.pageY);
    if ( !weaponPuzzle && clickedClue(e.pageX, e.pageY, [150, 65, 375, 315])) {
      setWeaponPuzzle(true);
      setShowWeapon(true);
    }
    else if ( !keyPuzzle && clickedClue(e.pageX, e.pageY, [375, 605, 410, 635]) ){
      setKeyPuzzle(true);
      setShowKey(true);
    }
  };


  //There are some numbers in the room written in a board, thinking of adding another puzzle where the answer will be all of those numbers added up

  return (
    <div className="mainContainer">
    <div className="cashDesk" onClick={handleClickedClue}>
      <Modal style={customStyles} isOpen={showWeapon}>
        <p>It appears your partner hid a weapon for you behind the board...</p>
        <img style={{height:"200px"}} src={Gun} alt=""></img>
        <button
          onClick={closeWeaponModal}
        >
          Close
        </button>
      </Modal>
      <Modal style={customStyles} isOpen={showKey}>
        <p>Nice, this key might help us get into any locked rooms</p>
        <img style={{height:"200px"}} src={Key} alt=""></img>
        <button
          onClick={closeKeyModal}
        >
          Close
        </button>
      </Modal>
      <div className="key">
        <img
        style={{
          height: "30px",
          marginLeft: "370px",
          marginTop: "594px"
        }}
          src={Key}
          alt=""
        ></img>
      </div>
    </div>
    <div className="lock"> 
    <img src={weaponPuzzle ? unlocked : lock} />
    <img src={keyPuzzle ? unlocked: lock} />
     </div>
     <Modal style={customStyles2} isOpen={nextRoomModal}>
        <p>
          Looks like you solved all the clues needed to advance...
        </p>
        <button className="goNextButton" onClick={nextRoom}>Next room</button>
     </Modal>
    </div>
  );
};

export default BankGameLevel2;
