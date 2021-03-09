import React, { useEffect, useState } from 'react';
import Gun from '../../../public/Images/gun.png';
import Modal from 'react-modal';
import '../../../public/CSS/Bank.css';

//streetlight coordinates from top left of streetlight, to bottom right
//x1 150, y1 220
//x2 200, y2 310

const BankGameLevel2 = (props) => {
  const [showWeapon, setShowWeapon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleHint = (e) => {
    setShowModal(true);
  };
  const clickedGun = (x, y, coordinatesArr) => {
    return (
      x >= coordinatesArr[0] &&
      x <= coordinatesArr[2] &&
      y >= coordinatesArr[1] &&
      y <= coordinatesArr[3]
    );
  };
  //[90, 40, 105, 55]
  const handleClickedGun = (e) => {
    console.log(e.pageX, e.pageY);
    if (clickedGun(e.pageX, e.pageY, [90, 47, 105, 67])) {
      setShowWeapon(true);
    }
  };

  //There are some numbers in the room written in a board, thinking of adding another puzzle where the answer will be all of those numbers added up

  return (
    <div className="cashDesk" onClick={handleClickedGun}>
      <Modal isOpen={showModal}>
        <p>
          Looks like we made it inside the bank... You may have to canvas the
          area for a weapon.
        </p>
        <button onClick={() => setShowModal(false)}>Close this hint</button>
      </Modal>
      <Modal isOpen={showWeapon}>
        <p>WOW, this looks like it can be dangerous</p>
        <img src={Gun} alt=""></img>
        <p>Lets use this gun to get the teller to take us to the safe</p>
        <button onClick={() => props.history.push('/Bankgame3')}>
          {' '}
          Proceed{' '}
        </button>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => setShowWeapon(false)}
        >
          Keep Searching Room
        </button>
      </Modal>
      <button style={{ float: 'right' }} onClick={handleHint}>
        Click for a hint
      </button>
      <div className="gun">
        <img
          style={{
            marginTop: '50px',
            marginLeft: '100px',
            height: '4px',
            width: '4px',
          }}
          src={Gun}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default BankGameLevel2;
