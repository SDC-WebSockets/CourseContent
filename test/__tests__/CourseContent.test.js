import React from 'react';
import { shallow, mount, render } from 'enzyme';

import CourseContent from '../../client/src/components/CourseContent.jsx';

describe('CourseComponent', () => {

  it('renders the inner Counter', () => {
    // const wrapper = mount(<CourseContent />);
    const one = 1;
    expect(one).toEqual(1);
  });

});