import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import ContentHeader from './ContentHeader.jsx';
<<<<<<< HEAD
import '../main.css';
=======
import styles from '../main.css';
>>>>>>> 1acc5a037a1f6c5d1c862eecace718c91cbff93b

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course: {},
      isLoaded: false
    };
  }

  componentDidMount() {

    axios.get(`/course/item?courseId=${this.props.courseId}`)
      .then((response) => {
        this.setState({
          isLoaded: true,
          course: response.data
        });
        console.log(response);
      });

  }

  render() {

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ContentHeader totalSections={this.state.course.totalSections} totalLectures={this.state.course.totalLectures} totalArticles={this.state.course.totalArticles} courseLength={this.state.course.courseLength}/>
          <br/>
          <br/>
          <div id="courseSectionsBlock">
            {this.state.course.sections.length > 0 &&
              this.state.course.sections.map(section => (
                <Section key={`section${section.sectionId}`} section={section} />
              ))}
          </div>
        </div>
      );
    }

  }

}

export default CourseContent;