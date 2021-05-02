import React from 'react';
import CourseContent from './components/CourseContent.jsx';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCourseContents();
  }

  getCourseContents(id = 3) {
    axios.get(`/course/item?courseId=${id}`)
      .then((response) => {
        console.log(response.data[0]);
        let state = response.data[0];
        this.setState({course: state});
      });
  }

  render() {
    return (
      <div>
        {this.state.course &&
          <CourseContent course={this.state.course} />
        }
      </div>
    );
  }
}

export default App;