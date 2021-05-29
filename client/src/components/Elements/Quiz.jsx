import React from 'react';
import {QuizSVG} from './svgIcons.js';
import {ContentDiv, ContentSpan, HasChild, RightSideInfo, Svg} from '../StyledComponents.js';

const Quiz = (props) => {

  return (
    <ContentDiv>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><QuizSVG /></Svg>
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

export default Quiz;