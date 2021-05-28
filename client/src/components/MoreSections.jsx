import React from 'react';
import {ShowMoreSections} from './StyledComponents.js';

const MoreSections = (props) => (

  <ShowMoreSections onClick={props.showMoreSections}>{props.numberOfSections - 10} more sections</ShowMoreSections>

);

export default MoreSections;