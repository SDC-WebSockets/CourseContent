import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';

const CourseContent = (props) => {

  return (
    <div>
      <h2>{props.course.title}</h2>
      {props.course.sections > 0 &&
        props.course.sections.map(section => (
          <Section key={section.courseId} section={section} />
        ))}
    </div>
  );


}

export default CourseContent;