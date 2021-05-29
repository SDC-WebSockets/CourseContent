import React from 'react';
import moment from 'moment';
import {LectureSVG} from './svgIcons.js';
import {ContentDiv, ContentA, HasChild, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Lecture = (props) => {

  return (
    <ContentDiv>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 20 20"><LectureSVG /></Svg>
        <ContentA>
          {props.element.title}
        </ContentA>
        <RightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
            <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </HasChild>
    </ContentDiv>
  );

};

export default Lecture;