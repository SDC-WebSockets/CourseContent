import React from 'react';
import moment from 'moment';
import icons from './svgIcons.js';
import {Div, HasChild, Preview, RightSideInfo} from '../StyledComponents.js';
// import style from '../../cssModules/subElement.css';

const Lecture = (props) => {

  return (
    <Div>
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
    </Div>
  );

};

export default Lecture;