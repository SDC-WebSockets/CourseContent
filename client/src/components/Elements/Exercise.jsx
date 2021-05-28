import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <div>
      <HasChild>
        <Svg id="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></Svg>
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

export default Exercise;