import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {ContentDiv, ContentSpan, HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <ContentDiv>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></Svg>
        <ContentSpan>
          {props.element.title}
        </ContentSpan>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </HasChild>
    </ContentDiv>
  );

};

export default Exercise;