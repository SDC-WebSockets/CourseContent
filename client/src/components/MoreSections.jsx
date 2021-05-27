import React from 'react';
import {ShowMoreSections} from './StyledComponents.js';

const MoreSections = (props) => (

  <ShowMoreSections onClick={props.onClick}>{props.numberOfSections - 10} more sections</ShowMoreSections>

);

export default MoreSections;