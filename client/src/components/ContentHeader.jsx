import React from 'react';
import moment from 'moment';
import {DivContent, ContentHeaderWrapper, HeaderInfo, ExpandCollapse} from './StyledComponents.js';

const ContentHeader = (props) => (

  <ContentHeaderWrapper>
    <h2>Course Content</h2>
    <DivContent>
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
          {props.allExpanded ? 'Collapse all sections' : 'Expand all sections'}
        </span>
      </ExpandCollapse>
    </DivContent>
  </ContentHeaderWrapper>

);

export default ContentHeader;