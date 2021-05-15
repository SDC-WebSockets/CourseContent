import { TestScheduler } from '@jest/core';
import { expectation } from 'sinon';
import {SampleReturnData, SampleCourseData, SampleSectionData, SampleElementData} from '../sampleTestData.js';
const helpers = require('../../server/helpers.js');


describe('Course Helpers', () => {

  it('Should return the correct API format for a Course', () => {
    const processedCourse = helpers.processCourses(SampleCourseData);
    expect(Array.isArray(processedCourse)).not.toBe(true);
  });

  it('Should throw an error if no courses are found', () => {
    expect(() => {
      helpers.processCourses([]);
    }).toThrow('No Courses Found');
  });

  it('Should throw an error if multiple courses are found', () => {
    expect(() => {
      helpers.processCourses(['hello', 'world']);
    }).toThrow('Multiple courseIds found');
  });

});

describe('Section Helpers', () => {

  const processedSection = helpers.processSection(SampleSectionData);

  it('Should return the correct API format', () => {
    expect(processedSection).toHaveProperty('sectionId');
    expect(processedSection).toHaveProperty('title');
    expect(processedSection).toHaveProperty('sectionLength');
    expect(processedSection).toHaveProperty('lectures');
    expect(processedSection).toHaveProperty('quizzes');
    expect(processedSection).toHaveProperty('exercises');
    expect(processedSection).toHaveProperty('articles');
    expect(processedSection).toHaveProperty('courseSequence');
    expect(processedSection).toHaveProperty('elements');
  });

  it('Should not contain _id property', () => {
    expect(processedSection).not.toHaveProperty('_id');
  });

  test.each(processedSection.elements)('Sub elements should not contain _.id property', (element) => {
    expect(element).not.toHaveProperty('_id');
  });

});

describe('Element Helpers', () => {

  const processedElement = helpers.processElement(SampleElementData);

  it('Should return the correct API format', () => {
    expect(processedElement).toHaveProperty('elementId');
    expect(processedElement).toHaveProperty('title');
    expect(processedElement).toHaveProperty('kind');
    expect(processedElement).toHaveProperty('sectionSequence');
  });

  it('Should not contain _id property', () => {
    expect(processedElement).not.toHaveProperty('_id');
  });

});