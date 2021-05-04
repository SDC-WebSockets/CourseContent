import React from 'react';
import moment from 'moment';

const ContentHeader = (props) => (

  <div style={{ maxWidth: '600px', maxHeight: '40px' }}>
    <h2>Course Content</h2>
    <div style={{ maxWidth: '310px', maxHeigth: '35px', float: 'left' }}>
      <span>
        {props.totalSections} Sections • {props.totalLectures + props.totalArticles} Lectures • <span><span>{moment(props.totalLength).format('H[h ]M[m]')}</span> total length</span>
      </span>
    </div>
    <button style={{ float: 'right' }} type="button">
      <span>
        Expand all Sections
      </span>
    </button>
  </div>

);

export default ContentHeader;