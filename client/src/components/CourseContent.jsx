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
      sectionDisplay: 'none',
      host: 'ec2-18-130-234-175.eu-west-2.compute.amazonaws.com:9800'
      // Dynamically set host in future
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {

    axios.get(`http://${this.state.host}/course/item?courseId=${this.state.courseId}`)
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

        let status;
        if (err.response) {
          if (err.response.status) {
            status = err.response.status;
          }
        } else {
          status = 500;
        }

        let data;
        if (err.response) {
          if (err.response.data) {
            data = err.response.data;
          }
        } else {
          data = 'Internal Server Error';
        }

        this.setState({error: {
          status,
          data}, isLoaded: true });
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