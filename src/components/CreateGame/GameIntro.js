// import React, { useEffect, useState } from 'react';
// import { connect } from "react-redux";
// import { fetchUserGame } from '../../store/game';








// const GameIntro = (props) => {

    
// //hard-coded userId of 2
//     useEffect(() => {      
//       console.log(props);
//       props.getGame(2, props.match.params.id);
//       }, []);
    
      
//       const { game } = props;
//   return (
//     <div>
//       <h1> {game.title} </h1>
//     <ul>
//       <li> number of puzzles : {game.numPuzzles} </li>
//       <li> All Puzzles : { game.puzzles ? game.puzzles.map(puzzle => {
//         return (
//           <p key={puzzle.id}> {puzzle.name} </p>
//         )
//       }) : "no puzzles"}
//       </li>
//       <li> theme : {game.theme} </li>      
//     </ul>   
//   </div>
//   );
// };

// const mapState = (state) => state;

// const mapDispatch = {
//   getGame : fetchUserGame
// };

// export default connect(mapState, mapDispatch)(GameIntro);