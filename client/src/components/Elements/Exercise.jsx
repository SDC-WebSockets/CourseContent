import React from 'react';
import icons from './svgIcons.js';
import style from '../../cssModules/subElement.css';

const Exercise = (props) => {

  return (
    <div>
      <div className="hasChild">
        <span dangerouslySetInnerHTML={{ __html: icons.r2 }}></span>
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