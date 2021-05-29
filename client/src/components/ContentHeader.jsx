import React from 'react';
import moment from 'moment';
import {ContentDiv, ContentSpan, ContentHeaderWrapper, HeaderInfo, ExpandCollapse} from './StyledComponents.js';

const ContentHeader = (props) => (

  <ContentHeaderWrapper>
    <h2>Course Content</h2>
    <ContentDiv>
      <HeaderInfo>
        <ContentSpan>
          {`${props.totalSections} Sections • ${props.totalLectures + props.totalArticles} Lectures • `}
          <ContentSpan>
            {`${moment.utc(props.courseLength).format('H[h ]M[m]')} total length`}
          </ContentSpan>
        </ContentSpan>
      </HeaderInfo>
      <ExpandCollapse onClick={props.expandOrCollapseAll}>
        <ContentSpan>
          {props.allExpanded ? 'Collapse all sections' : 'Expand all sections'}
        </ContentSpan>
      </ExpandCollapse>
    </ContentDiv>
  </ContentHeaderWrapper>

);

export default ContentHeader;