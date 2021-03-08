import React, { useState, useEffect } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Redirect } from 'react-router-dom';

export const Success = (props) => {
  const [advance, setAdvance] = useState(false);
  useEffect(() => setTimeout(() => setAdvance(true), 10000), []);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={100}
          cursorColor="white"
          text="You made it to the next room..insert graphic here or more narrative, etc .."
          typeSpeed={100}
        />
      </div>
      <div>YAY YOU MADE IT</div>
      {advance ? <Redirect to="/haunted/room3" /> : ''}
    </div>
  );
};
