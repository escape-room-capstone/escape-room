import React from "react";

const TimerBar = (props) => {
    const { barColor, digitColor, completed, time } = props;

    // split timer into minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    // styles for the bar
    const containerStyles = {
        height: 40,
        width: '100%',
        backgroundColor: "#bdbbb7",
        borderRadius: 50,
        margin: 50
    }
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: barColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    }
    const labelStyles = {
        padding: 5,
        color: digitColor,
        fontSize: 30,
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{minutes}: {seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
        </div>
    );
};

export default TimerBar;