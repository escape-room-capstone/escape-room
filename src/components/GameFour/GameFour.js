import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../public/CSS/nesRoom.css';
import Modal from 'react-modal';

const GameFour = (props) => {
  const [rooms, setRooms] = useState({
    livingRoom: false,
    backRoom: false,
    herRoom: false,
    hisRoom: false,
    attic: false,
    mountains: false,
  });

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <div className="background" id="home">
        <button className="secretButton" id="hisRoomButton">
          <Link to="/game4/hisroom">His Room</Link>
        </button>
        <button className="secretButton" id="atticButton">
          <Link to="/game4/attic">Attic</Link>
        </button>
        <button className="secretButton" id="livingRoomButton">
          <Link to="/game4/livingroom">Living Room</Link>
        </button>
        <button className="secretButton" id="herRoomButton">
          <Link to="/game4/herroom">Her Room</Link>
        </button>
        <button className="secretButton" id="backRoomButton">
          <Link to="/game4/backroom">Back Room</Link>
        </button>
      </div>
    </div>
  );
};

export default GameFour;

// <Modal isOpen={showModal}>
// <p>This is a modal. please close it now</p>
// <button onClick={() => setShowModal(false)}>Close the modal now</button>
// </Modal>

// export class KateRoom extends React.Component {
//   constructor() {
//     super();
//     this.state = { puzzleOne: false, showClue: false, showClue2: false };
//   }
//   render() {
//     return (
//       <div className="room-container">
//         <div className="room relative">
//           <Link to="/room1/laptop">
//             <span
//               onMouseOver={() => {
//                 console.log('mouseover');
//                 this.setState({ showClue: true });
//               }}
//               id="clue1"
//             >
//               {this.state.showClue ? '1357' : ''}
//             </span>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// export const LapTopCode = (props) => {
//   const [password, setPassword] = useState('');
//   const [solved, setSolved] = useState(false);
//   const [error, setError] = useState('');
//   const checkPassword = (password) => {
//     if (password === 'fullstack') {
//       setSolved(true);
//     } else {
//       setError('incorrect password');
//     }
//   };
//   return (
//     <div className="room-container">
//       <div className="laptop">
//         <div>
//           <span>Enter a password</span>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="text"
//             placeholder="password"
//           />
//           <button onClick={() => checkPassword(password)}>Enter</button>
//           <div className="error"> {error ? <p>{error}</p> : ''}</div>
//         </div>
//       </div>
//       {solved ? <Redirect to="/room2" /> : ''}
//     </div>
//   );
// };

// export class Room2 extends React.Component {
//   constructor() {
//     super();
//     this.state = { puzzleOne: false, showClue: false, showClue2: false };
//   }
//   render() {
//     return (
//       <div className="room-container">
//         <div className="room-2">Room 2</div>
//         <p className="white">You made it to room 2</p>
//       </div>
//     );
//   }
// }
