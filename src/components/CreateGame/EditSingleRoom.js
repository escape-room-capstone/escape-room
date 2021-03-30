import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { fetchSingleRoom } from '../../store/singeleRoom';
import Modal from 'react-modal';



const EditSingleRoom = (props) => {


  
  const [ showPrompt, setShowPrompt ] = useState(false);
  const [ top, setTop ] = useState("150");
  const [ left, setLeft ] = useState("600");
  const [ width, setWidth ] = useState("70");
  const [ height, setHeight ] = useState("20");

    useEffect(() => {            
      props.getRoom(props.match.params.id)
      }, []);
    
    
    
    //function to check if area clicked is TRUE to area where we want to be heard
    //**** Coordinates would have to be placed on a puzzle not a room..... */
    //0, 0, 40, 25

    //Function to be invoked when user presses "PLACE" button...
    let count = 0;
    const selectTwoPoints = (e) => {
      count++;
      if(count >= 2){

      }

    }


    const correctAreaClicked = (x, y, coordinatesArr) => {
        return (
          x >= coordinatesArr[0] &&
          x <= coordinatesArr[2] &&
          y >= coordinatesArr[1] &&
          y <= coordinatesArr[3]
        );
      };

      const handleClick = (e) => {
        // if(correctAreaClicked(e.pageX, e.pageY, [0, 0, 50, 25])){
            
        // }
        // else {
        //     console.log("were not...");
        // }      
        console.log(e.offsetX);
      
          
        if(!showPrompt && e.target.localName !== 'button'){
        console.log(e.pageX, e.pageY);
        }
       }

       const { room } = props;
       
       
       

       if(!room.puzzles){
         return "loading..."
       }

       const styles = {
        backgroundImage: `url(${room.imgSrc})`,
        height: '800px',
        width: '1440px',
        position: 'relative',
        backgroundSize: 'cover',
        margin: '0 auto'
            }

          
          //     <input type="text" value={this.state.value} onChange={this.handleChange} />
          
          
          
            
      
return (
    <div style={ styles } onClick={(e)=>handleClick(e)}>
        <input type="text" value={top} onChange={(e)=>setTop(e.target.value)} />
        <input type="text" value={left} onChange={(e)=>setLeft(e.target.value)} />
        <input type="text" value={width} onChange={(e)=>setWidth(e.target.value)} />
        <input type="text" value={height} onChange={(e)=>setHeight(e.target.value)} /> 
        <br />
        <br />

        <button onClick={()=>setShowPrompt(true)}> INSTRUCTIONS </button>              
      
      {room.puzzles.map(puzzle => {
        return (
          <div style={{ width : `${width}px`, height: `${height}px`, border : "4px solid red", position : "relative", top : `${top}px`, left : `${left}px` }} key={puzzle.id}> {puzzle.name} </div>
        )
      })}
      <Modal isOpen={showPrompt}>
        Edit the dimensions above to place your puzzle where you would like ! The red box determines the clickable area for someone to access your puzzle !
        Once the game is created the only thing that will be visible is your background image...
        <button onClick={() => setShowPrompt(false)}> Close </button>
      </Modal>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getRoom : fetchSingleRoom
};

export default connect(mapState, mapDispatch)(EditSingleRoom);