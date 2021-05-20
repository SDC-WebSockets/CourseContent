import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import {CourseSectionsBlock} from './StyledComponents.js';
import ContentHeader from './ContentHeader.jsx';
import qs from 'qs';

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    const queries = qs.parse(window.location.search);
    const courseId = Number(queries['?courseId']);

    this.state = {
      courseId,
      course: {},
      isLoaded: false,
      sectionDisplay: 'none'
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {

    axios.get(`http://127.0.0.1:9800/course/item?courseId=${this.state.courseId}`)
      .then((response) => {
        this.setState({
          isLoaded: true,
          course: response.data
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        console.log(err);
        this.setState({error: {
          status: err.response.status,
          data: err.response.data
        }, isLoaded: true });
      });

  }

  clickHandler() {

    if (this.state.sectionDisplay === 'block') {
      this.setState({sectionDisplay: 'none'});
    } else {
      this.setState({ sectionDisplay: 'block' });
    }
  }

  render() {

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return (
        <div>
          <h2>Course Content Error</h2>
          <h3>{`Error ${this.state.error.status} ${this.state.error.data}`}</h3>
        </div>
      );
    } else {
      return (
        <div>
          <ContentHeader totalSections={this.state.course.totalSections} totalLectures={this.state.course.totalLectures} totalArticles={this.state.course.totalArticles} courseLength={this.state.course.courseLength} clickHandler={this.clickHandler} />
          <br/>
          <br/>
          <CourseSectionsBlock>
            {this.state.course.sections.length > 0 &&
              this.state.course.sections.map(section => (
                <Section display={this.state.sectionDisplay} key={`section${section.sectionId}`} section={section} />
              ))}
          </CourseSectionsBlock>
        </div>
      );
    }

  }

}

export default CourseContent;