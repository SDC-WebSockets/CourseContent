import React from 'react';
import moment from 'moment';
import {ContentDiv, ContentSpan, ContentHeaderWrapper, ContentHeaderInfo, ContentExpandCollapse, ContentH2} from './StyledComponents.js';

const ContentHeader = (props) => (

  <ContentHeaderWrapper>
    <ContentH2>Course Content</ContentH2>
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