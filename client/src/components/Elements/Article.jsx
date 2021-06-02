import React from 'react';
import moment from 'moment';
import {ArticleSVG} from './svgIcons.js';
import {ContentDiv, ContentA, ContentHasChild, ContentPreview, ContentRightSideInfo, ContentSvg} from '../StyledComponents.js';

const Article = (props) => {

  return (
    <ContentDiv>
      <ContentHasChild>
        <ContentSvg className="icon-article" viewBox="0 0 24 24"><ArticleSVG /></ContentSvg>
        <ContentA>
          {props.element.title}
        </ContentA>
        <ContentRightSideInfo>{moment(props.element.elementLength).format('mm:ss')}</ContentRightSideInfo>
        {props.element.videoPreview &&
          <ContentPreview href={props.element.videoUrl}>Preview</ContentPreview>
        }
      </ContentHasChild>
    </ContentDiv>
  );


};

export default Article;