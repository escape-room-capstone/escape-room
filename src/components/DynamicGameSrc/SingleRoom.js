import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveGame } from '../../store/DynamicGame.js'
import DevTools from '../../programs/DevTools'

// Fetch data -- need to connect to redux and crete corresponding api / redux-router
const activeGameId = 1;
const activeLevelId = 1;
const activeRoomId = 2;
const activeImageId = 4;


// Dynamic game loading component
const SingleRoom = () => {

    // Map state to props && create a map dispatch variable 
    const game = useSelector(state => state.dynamicGame.activeGame);
    const dispatch = useDispatch();

    // Fetch the game from DynamincGame redux 
    useEffect(() => {
        dispatch(getActiveGame(activeGameId))
    }, []);

    return (
        <div className='dg-singleroom'>

            {/* <Programs /> -- willhave the in-game programs appearing here (timer, clicker, etc) */}
            <hr />
            {/* logic below prevents the code to render before the state is filled with data */}
            { game.id && (
                <div className='dg-singleroom'>
                    {/* DevTools -- to be added into route and takwen out of here */}
                    <DevTools
                        activeGame={game}
                        activeLevel={game.levels[activeLevelId]}
                        activeRoom={game.rooms[activeRoomId]}
                        activeImage={game.images[activeImageId]}
                    />
                    <hr />

                    <div className='dg-singleroom-programs'>In-game programs will appear here</div>
                    <hr />

                    <div className='dg-singleroom-title-text'>Text generated for the room will be rendered here</div>
                    <hr />

                    <div className='dg-singleroom-body'>
                        <img src={game.images[activeImageId].src}></img>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleRoom;