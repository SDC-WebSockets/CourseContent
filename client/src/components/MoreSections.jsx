import React from 'react';
import {ContentShowMoreSections} from './StyledComponents.js';

const MoreSections = (props) => (

  <ContentShowMoreSections onClick={props.showMoreSections}>{props.numberOfSections - 10} more sections</ContentShowMoreSections>

);

export default MoreSections;