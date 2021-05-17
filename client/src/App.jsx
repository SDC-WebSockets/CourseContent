import React from 'react';
import CourseContent from './components/CourseContent.jsx';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 3a581d5119abd0a994a594a21c3311ac26db78b9
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