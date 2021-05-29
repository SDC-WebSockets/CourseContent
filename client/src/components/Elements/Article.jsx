import React from 'react';
import moment from 'moment';
import {ArticleSVG} from './svgIcons.js';
import {DivContent, HasChild, Preview, RightSideInfo, Svg} from '../StyledComponents.js';

const Article = (props) => {

  return (
    <DivContent>
      <HasChild>
        <Svg className="icon-article" viewBox="0 0 24 24"><ArticleSVG /></Svg>
        <a>
          {props.element.title}
        </a>
        <RightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</RightSideInfo>
        {props.element.videoPreview &&
          <Preview href={props.element.videoUrl}>Preview</Preview>
        }
      </HasChild>
    </DivContent>
  );


};

export default Article;