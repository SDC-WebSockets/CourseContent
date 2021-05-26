import React from 'react';
import icons from './svgIcons.js';
import {HasChild, RightSideInfo} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <div>
      <HasChild>
        <span dangerouslySetInnerHTML={{ __html: icons.excercise }}></span>
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