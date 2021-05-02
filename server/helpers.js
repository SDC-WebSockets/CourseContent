
module.exports.processCourse = (courses) => {

  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    course['courseId'] = course._id;
    delete course._id;
    course.sections = module.exports.refactorSectionId(course.sections);
  }

  if (courses.length === 1) {
    return courses[0];
  } else {
    throw Error('More than one courseId found');
  }
};

module.exports.refactorSectionId = (sections) => {

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    section['sectionId'] = section._id;
    delete section._id;
    section.elements = module.exports.refactorElementId(section.elements);
  }

  return sections;
};

module.exports.refactorElementId = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element['elementId'] = element._id;
    delete element._id;
  }

  return elements;
};

module.exports.processElement = (course) => {

  let element = course[0].sections.elements;
  delete element._id;
  return element;
};

module.exports.processSection = (course) => {

  let section = course.sections;
  delete section._id;
  section.elements = module.exports.refactorElementId(section.elements);

  return section;
};