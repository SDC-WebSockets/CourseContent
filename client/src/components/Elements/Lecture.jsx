import React from 'react';
import moment from 'moment';
import {LectureSVG} from './svgIcons.js';
import {Div, A, ElementDiv, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Lecture = (props) => {

  return (
    <Div>
      <ElementDiv>
        <Svg className="icon-article" viewBox="0 0 20 20" style={{overflow: 'visible'}}><LectureSVG /></Svg>
        <A>
          {props.element.title}
        </A>
        <RightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
            <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </ElementDiv>
    </Div>
  );

};

export default Lecture;