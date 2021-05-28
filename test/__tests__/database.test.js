const db = require('../../database/index.js');
const Course = db.Course;
const seed = require('../../seedDatabase/index.js');
const sample = require('../sampleTestData.js');

describe('Database functions', () => {

  it('should return a single course by courseId', async (done) => {

    const mock = jest.spyOn(db, 'findCourse');

    let result = mock.mockImplementation(() => Promise.resolve(sample.SampleCourseData));

    console.log(result);

    const id = Math.floor(Math.random() * 100) + 1;
    const course = await db.findCourse(id)
      .then((result) => {
        console.log(result);
        return result;
      });

    expect(course.length).toEqual(1);
    done();
  });

});