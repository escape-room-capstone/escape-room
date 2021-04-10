import React from "react";

const TimerBar = (props) => {
    const { barColor, digitColor, completed, time } = props;

    // split timer into minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    // assign passed props to dynamic variables
    let barDynamicColor = barColor
    let dynamicCompleted = Math.max(completed, 19) 

    // change bar color and width based on time remaining
    if (time < 10) {
        barDynamicColor = 'red'
        dynamicCompleted = 19
    }

    // styles for the bar
    const containerStyles = {
        height: 40,
        width: 275,  
        backgroundColor: "#bdbbb7",
        borderRadius: 50,
        marginleft: 0,
    }
    const fillerStyles = {
        height: '100%',
        width: `${dynamicCompleted}%`,
        backgroundColor: barDynamicColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    }
    const labelStyles = {
        fontFamily: 'Stencil Std, fantasy',
        position: 'relative',
        top: 4,
        padding: 5,
        color: digitColor,
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 10,
        marginleft: 6,
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{minutes >= 1 ? `${minutes} : ` : ''}{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
        </div>
    );
};

export default TimerBar;