import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../../public/CSS/Bank.css';

const BankGameLevel3 = (props) => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [attempts, setAttempts] = useState(9);
  const [codeEntered, setCodeEntered] = useState('');
  const [points, setPoints] = useState(0);


  useEffect(()=>{
    console.log(points);
    if(points === 1){
      setTimeout(() => {
        props.history.push("/BankGameVictory")
      }, 2000);
    }
  })

  const handleChange = (e) => {
    setCodeEntered(e.target.value);
    console.log(codeEntered);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (codeEntered === '18776') {
      setPoints(points+1);
      setShowKeypad(false);
      alert('Congratulations! You successfully robbed the bank !!!');
    }
    if (attempts === 0) {
      alert('You got caught, enjoy your life in prison...');
      props.history.push('/home');
    } else if (codeEntered !== '18776') {
      alert(`INCORRECT! You have ${attempts} attempts remaining...`);
      setAttempts(attempts - 1);
      setCodeEntered('');
    }
  };

  const clickedKeypad = (x, y, coordinatesArr) => {
    return (
      x >= coordinatesArr[0] &&
      x <= coordinatesArr[2] &&
      y >= coordinatesArr[1] &&
      y <= coordinatesArr[3]
    );
  };
  //520, 260, 780, 670
  //885, 330, 960, 480
  const handleClickedKeypad = (e) => {
    console.log(e.pageX, e.pageY);
    if (clickedKeypad(e.pageX, e.pageY, [885, 330, 960, 480])) {
      setShowKeypad(true);
    }
    if (clickedKeypad(e.pageX, e.pageY, [520, 260, 780, 670])) {
      alert(
        "It's a safe... we need to crack it and leave soon, before the cops arrive..."
      );
    }
  };

  return (
    <div className="bankSafe" onClick={handleClickedKeypad}>
      <Modal isOpen={showKeypad}>
        <p>Hmm.... I wonder what the combination is to open this safe...</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Code :
            <input style={{margin: "10px" }} value={codeEntered} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <button onClick={() => props.history.push('/Bankgame2')}>          
          Back to level 2
        </button>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => setShowKeypad(false)}
        >
          Close keypad
        </button>
      </Modal>
    </div>
  );
};

export default BankGameLevel3;
