import React from 'react';
import icons from './svgIcons.js';
// import style from '../../cssModules/subElement.css';
import {Div, HasChild, RightSideInfo} from '../StyledComponents.js';

const Exercise = (props) => {

  return (
    <Div>
      <HasChild>
        <span dangerouslySetInnerHTML={{ __html: icons.r2 }}></span>
        <span>
          {props.element.title}
        </span>
        <RightSideInfo>
          {`${props.element.numQuestions} question`}
        </RightSideInfo>
      </HasChild>
    </Div>
  );

};

export default Exercise;