import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {Div, Span, HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <Div>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><QuizSVG /></Svg>
        <Span>
          {props.element.title}
        </Span>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </HasChild>
    </Div>
  );


};

export default Quiz;