import React from 'react';

const Exercise = (props) => {

  return (
    <li>
      <div>
        {/* <svg id="icon-play" viewBox="0 0 24 24"><path d="M2 12c0 5.525 4.475 10 10 10s10-4.475 10-10S17.525 2 12 2 2 6.475 2 12zm15 .114L9 16V8l8 4.114z"></path></svg> */}
        <div>
          <span>{props.element.title}</span>
        </div>
      </div>
    </li>
  );

};

export default Exercise;