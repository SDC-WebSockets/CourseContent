import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {ElementDiv, RightSideInfo, Svg, Div, Span} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <Div>
      <ElementDiv>
        <Svg id="icon-article" viewBox="0 0 24 24" style={{overflow: 'visible'}}><ExerciseSVG /></Svg>
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

export default Exercise;