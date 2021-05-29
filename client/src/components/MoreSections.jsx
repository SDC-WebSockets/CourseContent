import React from 'react';
import {DivContent, ShowMoreSections} from './StyledComponents.js';

const MoreSections = (props) => (

  <ShowMoreSections onClick={props.onClick}>{props.numberOfSections - 10} more sections</ShowMoreSections>

);

export default MoreSections;