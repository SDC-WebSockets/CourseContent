import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {ContentHasChild, ContentRightSideInfo, ContentSvg, ContentDiv, ContentSpan} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <ContentDiv>
      <ContentHasChild>
        <ContentSvg id="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></ContentSvg>
        <ContentSpan>
          {props.element.title}
        </ContentSpan>
        <ContentRightSideInfo>
          {`${props.element.numQuestions} question`}
        </ContentRightSideInfo>
      </ContentHasChild>
    </ContentDiv>
  );

};

export default Exercise;