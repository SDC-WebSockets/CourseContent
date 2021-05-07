import React from 'react';
import moment from 'moment';
import icons from './svgIcons.js';
import style from '../../cssModules/subElement.css';

const Lecture = (props) => {

  return (
    <div>
      <div className="hasChild">
        <span dangerouslySetInnerHTML={{__html: icons.boba}}></span>
        <a>
          {props.element.title}
        </a>
        <span className="right-side-info">{moment(props.element.elementLength).format('mm:ss')}</span>
        {props.element.videoPreview &&
            <a className="right-side-info preview" href={props.element.videoUrl}>Preview</a>
        }
      </div>
    </div>
  );

};

export default Lecture;