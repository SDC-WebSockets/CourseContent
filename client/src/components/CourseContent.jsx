import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import moment from 'moment';

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getCourseContents = this.getCourseContents.bind(this);
  }

  componentDidMount() {
    this.getCourseContents();
  }

  getCourseContents(id = 3) {

    axios.get(`/course/item?id=${id}`)
      .then((response) => {
        console.log(response.data);
        let state = response.data;
        this.setState(state);
      });

  }

  render() {

    return (
      <div onClick={this.getCourseContents}>
        <h2>{this.state.title}</h2>
        {this.state.sections &&
        this.state.sections.map(section => (
          <Section key={section._id} section={section} />
        ))}
      </div>
    );

  }

}

export default CourseContent;