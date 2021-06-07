import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {Div, Span, ElementDiv, RightSideInfo, Svg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <Div>
      <ElementDiv>
        <Svg className="icon-article" viewBox="0 0 24 24" style={{overflow: 'visible'}}><QuizSVG /></Svg>
        <Span>
          {props.element.title}
        </Span>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </ElementDiv>
    </Div>
  );


};

export default Quiz;