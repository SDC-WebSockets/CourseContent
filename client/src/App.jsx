import React from 'react';
import CourseContent from './components/CourseContent.jsx';
import axios from 'axios';
import {initialCourse} from '../../config.js';
import qs from 'qs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(event) {
  //   console.log(event);
  //   event.preventDefault();
  // }

  componentDidMount() {
    const queries = qs.parse(window.location.search);
    const courseId = Number(queries['?courseId']);
    this.setState({courseId});
    console.log();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="courseId" type="text" placeholder="courseId" />
          <input type="submit" value="Submit"/>
        </form>
        {this.state.courseId &&
          <CourseContent courseId={this.state.courseId} />
        }
      </div>
    );
  }
}

export default App;