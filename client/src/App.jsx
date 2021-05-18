import React from 'react';
import CourseContent from './components/CourseContent.jsx';
import axios from 'axios';
import qs from 'qs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const queries = qs.parse(window.location.search);
    const courseId = Number(queries['?courseId']);
    this.setState({courseId});
    console.log();
  }

  render() {
    return (
      <div>
        {this.state.courseId &&
          <CourseContent courseId={this.state.courseId} />
        }
      </div>
    );
  }
}

export default App;