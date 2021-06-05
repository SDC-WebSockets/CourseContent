import React from 'react';
import moment from 'moment';
import {Div, Span, HeaderWrapper, HeaderInfo, ExpandCollapse, H2} from './StyledComponents.js';

const ContentHeader = (props) => (

  <HeaderWrapper>
    <H2>Course </H2>
    <Div>
      <HeaderInfo>
        <Span>
          {`${props.totalSections} Sections • ${props.totalLectures + props.totalArticles} Lectures • `}
          <Span>
            {`${moment.utc(props.courseLength).format('H[h] m[m]')} total length`}
          </Span>
        </Span>
      </HeaderInfo>
      <ExpandCollapse onClick={props.expandOrCollapseAll}>
        <Span>
          {props.allExpanded ? 'Collapse all sections' : 'Expand all sections'}
        </Span>
      </ExpandCollapse>
    </Div>
  </HeaderWrapper>
  
);

export default ContentHeader;