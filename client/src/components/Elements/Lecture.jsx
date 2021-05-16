import React from 'react';
import moment from 'moment';
import icons from './svgIcons.js';
import {HasChild, Preview, RightSideInfo} from '../StyledComponents.js';

const Lecture = (props) => {

  return (
    <div>
      <HasChild>
        <span dangerouslySetInnerHTML={{__html: icons.boba}}></span>
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