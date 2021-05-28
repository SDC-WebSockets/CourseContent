const app = require('../../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Routes', () => {

  it('Gets the course endpoint', async (done) => {
    const response = await request.get(`/course/item?courseId=${Math.floor(Math.random() * 100) + 1}`);
    expect(response.status).toBe(200);
    done();
  });

  it('Gets the section endpoint', async (done) => {
    const response = await request.get(`/section/item?sectionId=${Math.floor(Math.random() * 100) + 1}`);
    expect(response.status).toBe(200);
    done();
  });

  it('Gets the element endpoint', async (done) => {
    const response = await request.get(`/element/item?elementId=${Math.floor(Math.random() * 100) + 1}`);
    expect(response.status).toBe(200);
    done();
  });

});