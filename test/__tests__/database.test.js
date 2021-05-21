const db = require('../../database/index.js');
const seed = require('../../seedDatabase/index.js');

describe('Database functions', () => {

  it('should return a single course by courseId', async (done) => {

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