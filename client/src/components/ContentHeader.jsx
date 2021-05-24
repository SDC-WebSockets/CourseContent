import React from 'react';
import moment from 'moment';
import {ContentHeaderWrapper, HeaderInfo, ExpandCollapse} from './StyledComponents.js';

const ContentHeader = (props) => {

  let expandCollapse;

  if (props.allExpanded) {
    expandCollapse = 'Collapse all Sections';
  } else {
    expandCollapse = 'Expand all Sections';
  }

  return (

    <ContentHeaderWrapper>
      <h2>Course Content</h2>
      <HeaderInfo>
        <span>
          {`${props.totalSections} Sections • ${props.totalLectures + props.totalArticles} Lectures • `}
          <span>
            {`${moment.utc(props.courseLength).format('H[h ]M[m]')} total length`}
          </span>
        </span>
      </HeaderInfo>
      <ExpandCollapse onClick={props.clickHandler}>
        <span>
          {expandCollapse}
        </span>
      </ExpandCollapse>
    </ContentHeaderWrapper>

  );


};

export default ContentHeader;