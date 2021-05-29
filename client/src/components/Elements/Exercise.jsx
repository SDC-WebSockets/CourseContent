import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {DivContent, HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <DivContent>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></Svg>
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

export default Exercise;