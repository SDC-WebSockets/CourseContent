import React from 'react';
import moment from 'moment';
import {LectureSVG} from './svgIcons.js';
import {Div, A, ElementTitle, ElementDiv, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Lecture = (props) => {
  let hyperlinked;

  if (props.element.videoPreview) {
    hyperlinked = <ElementTitle href={props.element.videoPreview ? props.element.videoUrl : ''}>{props.element.title}</ElementTitle>;
  } else {
    hyperlinked = <A>{props.element.title}</A>;
  }

  return (
    <Div>
      <ElementDiv>
        <Svg className="icon-article" viewBox="0 0 20 20" style={{overflow: 'visible'}}><LectureSVG /></Svg>
        {hyperlinked}
        <RightSideInfo>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
          <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </ElementDiv>
    </Div>
  );

};

export default Lecture;