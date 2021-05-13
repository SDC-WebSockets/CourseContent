import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { SampleReturnData } from '../sampleTestData.js';

import axios from 'axios';
import CourseContent from '../../client/src/components/CourseContent.jsx';
import Section from '../../client/src/components/Section.jsx';
import ContentHeader from '../../client/src/components/ContentHeader.jsx';


describe('CourseComponent', () => {
  jest.mock('axios');

  xit('exists', () => {
    const wrapper = mount(<CourseContent />);
    expect(wrapper.contains(CourseContent)).toBe(true);
    wrapper.unmount();
  });

  it('sets isLoaded once API is called', () => {
    sinon.spy(CourseContent.prototype, 'componentDidMount');
    const wrapper = mount(<CourseContent />);
    wrapper.update();
    expect(wrapper.state('isLoaded')).toEqual(true);
  });

  xit('receives a course object', () => {

  });

  xit('renders correct number of sections', () => {
    const wrapper = mount(<CourseContent />);
    wrapper.setState({course: SampleTestData});
    console.log(SampleTestData.sections.length);
    console.log(wrapper.find(Section).length);
    expect(wrapper.findAll(Section).length).toBe(SampleReturnData.sections.length);
  });

});