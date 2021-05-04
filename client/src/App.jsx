import React from 'react';
import CourseContent from './components/CourseContent.jsx';
import axios from 'axios';
import {initialCourse} from '../../config.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseId: 3
    };
  }

  render() {
    return (
      <div>
        <CourseContent courseId={this.state.courseId} />
      </div>
    );
  }
}

export default App;