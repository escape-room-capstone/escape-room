import React, { useEffect } from 'react';
import { connect } from "react-redux";



const EditSingleRoom = (props) => {

    

    // useEffect(() => {      
    //   console.log(props);
    //   props.getGame(2, props.match.params.id);
    //   }, []);
    
    console.log(props);

    
    //function to check if area clicked is TRUE to area where we want to be heard
    //0, 0, 40, 25
    const correctAreaClicked = (x, y, coordinatesArr) => {
        return (
          x >= coordinatesArr[0] &&
          x <= coordinatesArr[2] &&
          y >= coordinatesArr[1] &&
          y <= coordinatesArr[3]
        );
      };

      const handleClick = (e) => {
        if(correctAreaClicked(e.pageX, e.pageY, [0, 0, 40, 25])){
            console.log("we here!");
            console.log(e.pageX, e.pageY);
        }
        else {
            console.log("we not...");
        }        
       }

    
    
      
return (
    <div style={{ width: "500px", height:"500px"}} onClick={(e)=>handleClick(e)}>
      Hello      
    </div>
  );
};

const mapState = (state) => state;

// const mapDispatch = {
//   getGame : fetchUserGame
// };

export default connect(mapState)(EditSingleRoom);