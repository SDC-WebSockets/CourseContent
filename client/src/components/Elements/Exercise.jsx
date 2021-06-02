import React from 'react';
import {ExerciseSVG} from './svgIcons.js';
import {ContentHasChild, ContentRightSideInfo, ContentSvg} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <div>
      <ContentHasChild>
        <ContentSvg id="icon-article" viewBox="0 0 24 24"><ExerciseSVG /></ContentSvg>
        <span>
          {props.element.title}
        </span>
        <ContentRightSideInfo>
          {`${props.element.numQuestions} question`}
        </ContentRightSideInfo>
      </ContentHasChild>
    </div>
  );

};

export default Exercise;