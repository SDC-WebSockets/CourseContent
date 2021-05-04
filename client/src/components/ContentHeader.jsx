import React from 'react';
import moment from 'moment';

const ContentHeader = (props) => (

  <div id="contentHeader">
    <h2>Course Content</h2>
    <div id="headerInfo">
      <span>
        {props.totalSections} Sections • {props.totalLectures + props.totalArticles} Lectures • <span><span>{moment(props.totalLength).format('H[h ]M[m]')}</span> total length</span>
      </span>
    </div>
    <button id="expandCollapse" type="button">
      <span>
        Expand all Sections
      </span>
    </button>
  </div>

);

export default ContentHeader;