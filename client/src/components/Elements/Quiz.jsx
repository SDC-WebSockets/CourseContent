import React from 'react';
import icons from './svgIcons.js';

const Quiz = (props) => {

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: icons.chewy }}></span>
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

export default Quiz;