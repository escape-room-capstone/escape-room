import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGame, updateTimer } from '../store/game';
import { Burger } from './Burger';


const _FailPage = (props) => {
     // pick up data from props
    let { gameId } = props.match.params;
    const { game } = props;
    const { rooms } = game;

    // load game data when component mounts
    useEffect(() => {
        props.setGame(gameId);
    }, [gameId]);

    // sort the rooms in order using the room['number']
    const sortGameRooms = (gameRooms) => {
        const gameRoomsSorted = gameRooms.sort((roomA, roomB) => {
            return roomA.number - roomB.number;
        });
        return gameRoomsSorted[0].id;
    };

    // end the game
    const handleEndGame = async (e) => {
        // reset game timer ('-1' is the default value of the countdown when game is created)
        const time = -1;
        await props.resetTimer(gameId, time);
        // send the user back to homepage or restart the game 
        e.target.name === 'end' ? props.history.push(`/home`) : props.history.push(`/games/${gameId}/${sortGameRooms(rooms)}/0`);
    }

    // render victory page once the game was loaded
    if (!game) {
        return null;
    }
    return (
        <div id="victory-page">
            <Burger {...props} />
            <div id="spacer" style={{height: '100px'}}></div>
            <div id="victory-body"
                style={{
                    height: '559px',
                    width: '1000px',
                    backgroundImage: 'url(/Images/fail.jpeg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    margin: '0 auto',
                    position: 'relative',
                    border: '5px solid black',
                }}
            >
                <button name='restart' onClick={(e) => handleEndGame(e)}>Restart game</button>
                <button name='end' onClick={(e) => handleEndGame(e)}>Close game and return home</button>
            </div>
        </div>
    )
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
    return {
        setGame: (gameId) => dispatch(fetchGame(gameId)),
        resetTimer: (userId, gameId, time) =>
            dispatch(updateTimer(userId, gameId, time)),
    };
};

export const FailPage = connect(mapState, mapDispatch)(_FailPage);
