import React from 'react';
import moment from 'moment';

const ContentHeader = (props) => (

  <div id="contentHeader">
    <h2>Course Content</h2>
    <div id="headerInfo">
      <span>
        {`${props.totalSections} Sections • ${props.totalLectures + props.totalArticles} Lectures • `}
        <span>
          {`${moment.utc(props.courseLength).format('H[h ]M[m]')} total length`}
        </span>
      </span>
    </div>
    <button id="expandCollapse" type="button" onClick={props.clickHandler}>
      <span>
        Expand all Sections
      </span>
    </button>
  </div>

);

export default ContentHeader;