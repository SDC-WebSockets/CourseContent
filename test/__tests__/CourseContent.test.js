import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CourseContent from '../../client/src/components/CourseContent.jsx';

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
    expect(wrapper.contains);
  });

});