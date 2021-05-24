import React from 'react';
import axios from 'axios';
import Section from './Section.jsx';
import {CourseSectionsBlock} from './StyledComponents.js';
import ContentHeader from './ContentHeader.jsx';
import qs from 'qs';

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
    const queries = qs.parse(window.location.search);
    const courseId = Number(queries['?courseId']);

    let expanded = [];

    for (let i = 0; i < 100; i++) {
      if (i === 0) {
        expanded.push('block');
      } else {
        expanded.push('none');
      }
    }

    this.state = {
      courseId,
      course: {},
      isLoaded: false,
      expanded,
      allExpanded: false,
      host: '127.0.0.1:9800'
      // Dynamically set host in future
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {

    axios.get(`http://${this.state.host}/course/item?courseId=${this.state.courseId}`)
      .then((response) => {
        this.setState({
          isLoaded: true,
          course: response.data
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }

        let status;
        if (err.response) {
          if (err.response.status) {
            status = err.response.status;
          }
        } else {
          status = 500;
        }

        let data;
        if (err.response) {
          if (err.response.data) {
            data = err.response.data;
          }
        } else {
          data = 'Internal Server Error';
        }

        this.setState({error: {
          status,
          data}, isLoaded: true });
      });

  }

  expandAll() {
    let opened = this.state.expanded.map(element => 'block');
    this.setState({
      expanded: opened,
      allExpanded: true
    });
  }

  collapseAll() {
    let closed = this.state.expanded.map(element => 'none');
    this.setState({
      expanded: closed,
      allExpanded: false
    });
  }

  toggleView(idx) {
    const expanded = this.state.expanded;
    if (expanded[idx] === 'block') {
      console.log('switching to none');
      expanded[idx] = 'none';
    } else {
      console.log('switching to block');
      expanded[idx] = 'block';
    }
    this.setState({expanded});
  }

  clickHandler() {
    if (this.state.allExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  }

  render() {

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return (
        <div>
          <h2>Course Content Error</h2>
          <h3>{`Error ${this.state.error.status} ${this.state.error.data}`}</h3>
        </div>
      );
    } else {
      return (
        <div>
          <ContentHeader totalSections={this.state.course.totalSections} totalLectures={this.state.course.totalLectures} totalArticles={this.state.course.totalArticles} courseLength={this.state.course.courseLength} clickHandler={this.clickHandler} allExpanded={this.state.allExpanded}/>
          <br/>
          <br/>
          <CourseSectionsBlock>
            {this.state.course.sections.length > 0 &&
                this.state.course.sections.map((section, idx) => {
                  return <Section idx={idx} display={this.state.expanded[idx]} key={`section${section.sectionId}`} section={section} toggleView={this.toggleView}/>;
                })}
          </CourseSectionsBlock>
        </div>
      );
    }

  }

}

export default CourseContent;