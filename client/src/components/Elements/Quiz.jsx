import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {DivContent, HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <DivContent>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><QuizSVG /></Svg>
        <span>
          {props.element.title}
        </span>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </HasChild>
    </DivContent>
  );


};

export default Quiz;