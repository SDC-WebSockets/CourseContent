import React from 'react';
import icons from './svgIcons.js';

const Exercise = (props) => {

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: icons.r2 }}></span>
      <div>
        <span>
          {props.element.title}
        </span>
        <span className="right-side-info">
          {`${props.element.numQuestions} question`}
        </span>
      </div>
    </div>
  );

};

export default Exercise;