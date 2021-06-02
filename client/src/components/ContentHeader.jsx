import React from 'react';
import moment from 'moment';
import {ContentDiv, ContentSpan, ContentHeaderWrapper, ContentHeaderInfo, ContentExpandCollapse} from './StyledComponents.js';

const ContentHeader = (props) => (

  <ContentHeaderWrapper>
    <h2>Course Content</h2>
    <ContentDiv>
      <ContentHeaderInfo>
        <ContentSpan>
          {`${props.totalSections} Sections • ${props.totalLectures + props.totalArticles} Lectures • `}
          <ContentSpan>
            {`${moment.utc(props.courseLength).format('H[h ]M[m]')} total length`}
          </ContentSpan>
        </ContentSpan>
      </ContentHeaderInfo>
      <ContentExpandCollapse onClick={props.expandOrCollapseAll}>
        <ContentSpan>
          {props.allExpanded ? 'Collapse all sections' : 'Expand all sections'}
        </ContentSpan>
      </ContentExpandCollapse>
    </ContentDiv>
  </ContentHeaderWrapper>

);

export default ContentHeader;