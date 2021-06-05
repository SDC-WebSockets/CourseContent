import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {HasChild, RightSideInfo, Svg, Div, Span} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <Div>
      <HasChild>
        <Svg id="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></Svg>
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

export default Exercise;