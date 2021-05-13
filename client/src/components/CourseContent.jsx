import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import ContentHeader from './ContentHeader.jsx';
import styles from '../main.css';

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course: {},
      isLoaded: false,
      sectionDisplay: 'none'
    };
    this.clickHandler = this.clickHandler.bind(this);
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

  clickHandler(e) {

    console.log(e);

    if (this.state.sectionDisplay === 'block') {
      this.setState({sectionDisplay: 'none'});
    } else {
      this.setState({ sectionDisplay: 'block' });
    }
  }

  render() {

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ContentHeader totalSections={this.state.course.totalSections} totalLectures={this.state.course.totalLectures} totalArticles={this.state.course.totalArticles} courseLength={this.state.course.courseLength}clickHandler={this.clickHandler} />
          <br/>
          <br/>
          <div id="courseSectionsBlock">
            {this.state.course.sections.length > 0 &&
              this.state.course.sections.map(section => (
                <Section display={this.state.sectionDisplay} key={`section${section.sectionId}`} section={section} />
              ))}
          </div>
        </div>
      );
    }

  }

}

export default CourseContent;