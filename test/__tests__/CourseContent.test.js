import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import SampleTestData from '../sampleTestData.js';

import CourseContent from '../../client/src/components/CourseContent.jsx';
import Section from '../../client/src/components/Section.jsx';
import ContentHeader from '../../client/src/components/ContentHeader.jsx';
// import { it } from 'date-fns/locale';

describe('CourseComponent', () => {

  it('exists', () => {
    const wrapper = mount(<CourseContent />);
    expect(wrapper.contains(CourseContent)).toBe(true);
    wrapper.unmount();
  });

  it('calls componentDidMount', () => {
    sinon.spy(CourseContent.prototype, 'componentDidMount');
    const wrapper = mount(<CourseContent />);
    expect(CourseContent.prototype.componentDidMount).toHaveProperty('callCount', 1);
  });

  it('renders all immediate sub-components', () => {
    const wrapper = mount(<CourseContent />);
    wrapper.setState({course: SampleTestData});
    expect(wrapper.contains([Section, ContentHeader]));
    wrapper.unmount();
  });

  it('renders correct number of sections', () => {
    const wrapper = mount(<CourseContent />);
    wrapper.setState({course: SampleTestData});
    console.log(SampleTestData.sections.length);
    console.log(wrapper.find(Section));
    expect(wrapper.find(Section)).toHaveLength(SampleTestData.sections.length);
  });

});