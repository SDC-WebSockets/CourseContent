
module.exports.refactorCourseId = (courses) => {

  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    course['courseId'] = course._id + 1;
    delete course._id;
    course.sections = module.exports.refactorSectionId(course.sections);
  }

  return courses;
};

module.exports.refactorSectionId = (sections) => {

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    section['sectionId'] = section._id + 1;
    delete section._id;
    section.elements = module.exports.refactorElementId(section.elements);
  }

  return sections;
};

module.exports.refactorElementId = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element['elementId'] = element._id + 1;
    delete element._id;
  }

  return elements;
};