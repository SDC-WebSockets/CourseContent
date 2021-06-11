import React from 'react';
import {ShowMoreSections} from './StyledComponents.js';

const MoreSections = (props) => (

  <ShowMoreSections onClick={props.showMoreSections}>{props.numberOfSections - 10} more {props.numberOfSections - 10 === 1 ? 'section' : 'sections'}</ShowMoreSections>

);

export default MoreSections;