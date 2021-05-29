import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <div>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><QuizSVG /></Svg>
        <span>
          {props.element.title}
        </span>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </HasChild>
    </div>
  );


};

export default Quiz;