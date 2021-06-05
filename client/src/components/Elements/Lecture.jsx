import React from 'react';
import moment from 'moment';
import {LectureSVG} from './svgIcons.js';
import {Div, A, HasChild, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Lecture = (props) => {

  return (
    <Div>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 20 20"><LectureSVG /></Svg>
        <A>
          {props.element.title}
        </A>
        <RightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
            <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </HasChild>
    </Div>
  );

};

export default Lecture;