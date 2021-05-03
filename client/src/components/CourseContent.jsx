import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';
import ContentHeader from './ContentHeader.jsx';

const CourseContent = (props) => {

  console.log(props.course);
  return (
    <div>
      <ContentHeader totalSections={props.course.totalSections} totalLectures={props.course.totalLectures} totalArticles={props.course.totalArticles} totalLength={props.course.totalLength}/>
      <br/>
      <div>
        {props.course.sections.length > 0 &&
          props.course.sections.map(section => {
            console.log(section.sectionId);
            return <Section key={section.sectionId} section={section} />;
          })}
      </div>
    </div>
  );

};

export default CourseContent;