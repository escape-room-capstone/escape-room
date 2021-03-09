import React from 'react'


//streetlight coordinates from top left of streetlight, to bottom right
//x1 150, y1 220
//x2 200, y2 310

const BankGameStart = (props) => {

    //coordinates array will be an array in this format [ x1, y1, x2, y2]
    //so we will check to see if what we clicked is within the range of our x and y coordinates
    const clickedStreetlight = (x, y, coordinatesArr) => {
        
        return x >= coordinatesArr[0] && x <= coordinatesArr[2] && y >= coordinatesArr[1] && y <= coordinatesArr[3];                    
    }
    // coordinates for streetlight 2 ---> 1260, 230, 1300, 310
    const handleClick = (e) => {
        //console.log("EVENT", e);
        console.log(e.pageX, e.pageY);
        e.preventDefault();

        //This part of the code is where the user will be accredited points for solving hints
        //and where the state will be modified

        //ALSO ADD pictures of some sort of locks and keys system to show the user how many hints/problems
        //they need to solve in order to advance to the next level
        //Could be a lock and a key, solving one hint turns the lock picture into a unlocked or key picture
        //could be happy and sad faces, solving one hint turns one of the sad faces to a happy face
        if(clickedStreetlight(e.pageX, e.pageY, [150, 200, 220, 310]) || clickedStreetlight(e.pageX, e.pageY, [1260, 230, 1300, 310])){
            if (window.prompt("What's 2+2?") === "4"){
                window.alert("Wow, good guess. We need a way to cut the electricity so we don't raise alarms.");

               if (window.prompt("Pick one out of the four ways. Cut the wires, Call 911, Call Con-Edison, Climb the street light and hang on the wires") === "Cut the wires") {
                   window.alert("Thank god you're smart, hit ok to go to the next level");
                   props.history.push("/Bankgame2")
               }
               else{
                   window.alert("Sorry, try again");
               };

            }
            else {
                window.alert("Sorry that's incorrect.  Hint: It's not a trick question")
            }
        };

        clickedStreetlight(e.pageX, e.pageY, [1250, 220, 1305, 310])
        //console.log(e.pageX, e.pageY);       
    }


    //I PLAN TO ADD A STATE TO THIS COMPONENT AND ONLY LETTING THE USER PASS WHEN HE HAS 
    //ACCUMULATED A CERTAIN AMOUNT OF POINTS/HINTS TO ADVANCE TO THE NEXT LEVEL

    //EXAMPLE OF USING STATE
    //STATE = { 
    //    numberOfPoints : 0,
    //    hint1Solved: false,
    //    hint2Solved: false,
    //    hint3Solved: false
    //}

    //When a user solves a hint/problem correctly, setState of solved hint to TRUE, and
    //reward user a point. When all 3 hints are TRUE and numberOfPoints: 3, they move on.
  return (
    <div className="bankGame" onClick={handleClick}>

    </div>
  )
}


export default BankGameStart;