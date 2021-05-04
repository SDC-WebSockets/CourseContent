import React from 'react';
import moment from 'moment';
import Article from './Elements/Article.jsx';
import Exercise from './Elements/Lecture.jsx';
import Lecture from './Elements/Lecture.jsx';
import Quiz from './Elements/Quiz.jsx';

const Element = (props) => {

  if (props.kind === 'article') {
    return <Article element={props.element} />;
  } else if (props.kind === 'exercise') {
    return <Exercise element={props.element} />;
  } else if (props.kind === 'lecture') {
    return <Lecture element={props.element} />;
  } else if (props.kind === 'quiz') {
    return <Quiz element={props.element} />;
  }

};

export default Element;