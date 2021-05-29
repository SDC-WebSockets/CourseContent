import React from 'react';
import moment from 'moment';
import {LectureSVG} from './svgIcons.js';
import {HasChild, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Lecture = (props) => {

  return (
    <div>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 20 20"><LectureSVG /></Svg>
        <a>
          {props.element.title}
        </a>
        <RightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
            <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </HasChild>
    </div>
  );

};

export default Lecture;