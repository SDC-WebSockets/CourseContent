import React from 'react';
import Article from './Elements/Article.jsx';
import Exercise from './Elements/Exercise.jsx';
import Lecture from './Elements/Lecture.jsx';
import Quiz from './Elements/Quiz.jsx';
import {Li} from './StyledComponents.js';

const Element = (props) => (
  <Li>
    {props.kind === 'article' &&
      <Article element={props.element} key={`article${props.element.elementId}`}/>}
    {props.kind === 'exercise' &&
      <Exercise element={props.element} key={`exercise${props.element.elementId}`}/>}
    {props.kind === 'lecture' &&
      <Lecture element={props.element} key={`lecture${props.element.elementId}`}/>}
    {props.kind === 'quiz' &&
      <Quiz element={props.element} key={`quiz${props.element.elementId}`}/>}
  </Li>

);

export default Element;