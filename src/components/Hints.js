import React, { useState } from 'react';
import '../../public/CSS/puzzle.css';

export const Hints = (props) => {
  const [hints, setHints] = useState(props.puzzlehints);
  const toggleHint = (e, idx) => {
    let puzzlehints = [...hints];
    puzzlehints = puzzlehints.map((hint, index) => {
      if (idx === index) {
        hint.show = !hint.show;
        return hint;
      } else {
        return hint;
      }
    });
    setHints(puzzlehints);
  };
  console.log(hints, 'hints');
  return (
    <div>
      {hints
        ? hints.map((hint, idx) => (
            <div key={idx} id="hints">
              <p>
                {`Hint ${idx + 1}`}
                <button onClick={(e) => toggleHint(e, idx)}>
                  {hint.show ? 'HIDE' : 'SHOW'}
                </button>
                <span className={hint.show ? 'selected' : ''}>{hint.text}</span>
              </p>
            </div>
          ))
        : ''}
    </div>
  );
};
