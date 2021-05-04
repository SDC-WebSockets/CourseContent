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
    // this.getCourseContents = this.getCourseContents.bind(this);
    // this._isMounted = false;
  }

  // async componentDidMount() {
  //   // this._isMounted = true;
  //   let response = await this.getCourseContents();
  //   console.log(response);
  //   // if (this._isMounted) {
  //     this.setState({course: response});
  //   // }
  // }

  // componentWillUnmount() {
  //   // this._isMounted = false;
  // }

  // async getCourseContents(id = 3) {
  //   return await axios.get(`/course/item?courseId=${id}`)
  //     .then((response) => {
  //       return response.data;
  //     });
  // }

  render() {
    // console.log('this.state.course', this.state.course);
    return (
      <div>
        {/* {this.state.course && */}
        <CourseContent courseId={this.state.courseId} />
        {/* } */}
      </div>
    );
  }
}

export default App;