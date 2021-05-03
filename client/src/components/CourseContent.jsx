import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';

const CourseContent = (props) => {

  console.log(props.course);
  return (
    <div>
      <div style={{ maxWidth: '600px', maxHeight: '40px' }}><div style={{ maxWidth: '310px', maxHeigth: '35px' }}><span>{props.course.totalSections} Sections • {props.course.totalLectures + props.course.totalArticles} Lectures • <span><span>{moment(props.course.totalLength).format('H[h ]M[m]')}</span> total length</span></span></div></div>
      {props.course.sections.length > 0 &&
        props.course.sections.map(section => {
          console.log(section.sectionId);
          return <Section key={section.sectionId} section={section} />;
        })}
    </div>
  );

};

export default CourseContent;