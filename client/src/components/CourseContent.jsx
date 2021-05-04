import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';
import ContentHeader from './ContentHeader.jsx';
import '../main.css';

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
        console.log(response.data);
      });

  }

  render() {

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ContentHeader totalSections={this.state.course.totalSections} totalLectures={this.state.course.totalLectures} totalArticles={this.state.course.totalArticles} totalLength={this.state.course.totalLength}/>
          <br/>
          <br/>
          <div style={{ maxWidth: '600px', padding: '0'}}>
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