import React from 'react';
import moment from 'moment';
import icons from './svgIcons.js';
// import style from '../../cssModules/subElement.css';
import {Div, HasChild, Preview, RightSideInfo} from '../StyledComponents.js';

const Article = (props) => {

  return (
    <Div>
      <HasChild>
        <span dangerouslySetInnerHTML={{ __html: icons.vader }}></span>
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

export default Article;