import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {ContentDiv, ContentSpan, ContentHasChild, ContentRightSideInfo, ContentSvg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <ContentDiv>
      <ContentHasChild>
        <ContentSvg className="icon-article" viewBox="0 0 24 24"><QuizSVG /></ContentSvg>
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

export default Quiz;