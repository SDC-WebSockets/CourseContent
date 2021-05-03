import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';

const CourseContent = (props) => {

  // console.log(props.course);
  return (
    <div>
      <div>{props.course.courseId}</div>
      {props.course.sections > 0 &&
        props.course.sections.map(section => (
          <Section key={section.courseId} section={section} />
        ))}
    </div>
  );

};

export default CourseContent;