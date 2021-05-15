const refactorElementIds = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element._id) {
      delete element._id;
    }
  }
 
  return elements;
};

const refactorSectionIds = (sections) => {

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    if (section._id) {
      delete section._id;
    }
    section.elements = refactorElementIds(section.elements);
  }

  return sections;
};

module.exports.processCourses = (courses) => {

  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    if (course._id) {
      delete course._id;
    }
    course.sections = refactorSectionIds(course.sections);
  }

  return courses[0];
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