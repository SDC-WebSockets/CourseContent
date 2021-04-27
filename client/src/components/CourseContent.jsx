import React from 'react';
import axios from 'axios';

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: {},
      mounted: false
    };
    // this.getCourseContents = this.getCourseContents.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
    axios.get('/course', { params: { id: 3 } })
      .then((response) => {
        console.log(response);
      });
  }

  getCourseContents() {
    console.log('hello');

    axios.get('/course', {params: {id: 3}})
      .then((response) => {
        console.log(response);
      });

  }

  render() {

    return (
      <div>
        <button onClick={() => {
          console.log('hello');
        }}>Hello</button>
      </div>
    );

  }

}

export default CourseContent;