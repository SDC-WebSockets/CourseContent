const refactorElementIds = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    delete element._id;
  }

  return elements;
};

const refactorSectionIds = (sections) => {

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    delete section._id;
    section.elements = refactorElementIds(section.elements);
  }

  return sections;
};

module.exports.processCourses = (courses) => {

  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    delete course._id;
    course.sections = refactorSectionIds(course.sections);
  }

  if (courses.length === 1) {
    return courses[0];
  } else {
    throw Error('More than one courseId found');
  }
};

module.exports.processElement = (course) => {

  let element = course[0].sections.elements;
  delete element._id;
  return element;
};

module.exports.processSection = (course) => {

  let section = course[0].sections;
  delete section._id;
  section.elements = refactorElementIds(section.elements);

  return section;
};