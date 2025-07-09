const request = require('supertest');
const app = require('../index'); // adjust if needed

let cookie;

beforeAll(async () => {
  // 🔑 Login to get cookie before running tests
  const res = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@example.com', password: 'password123' });

  cookie = res.headers['set-cookie'];
});

describe('Job Routes', () => {
  it('should create, update, and fetch jobs', async () => {
    // 🔥 Create job
    const createRes = await request(app)
      .post('/api/jobs/')
      .set('Cookie', cookie)
      .send({
        title: 'Backend Developer',
        description: 'Test job',
        location: 'Remote',
        skills: ['Node.js', 'MongoDB'],
        experienceRequired: 2,
        company: 'Test Company',
      });

    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.job.title).toBe('Backend Developer');

    const jobId = createRes.body.job._id;

    // 🔥 Update job
    const updateRes = await request(app)
      .patch(`/api/jobs/${jobId}/edit`) // ✅ adjust route to your update route
      .set('Cookie', cookie)
      .send({
        title: 'Updated Job Title',
        description: 'Updated Description',
      });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.job.title).toBe('Updated Job Title');
    expect(updateRes.body.job.description).toBe('Updated Description');

    // 🔥 Fetch all jobs
    const fetchRes = await request(app)
      .get('/api/jobs/getjobs')
      .set('Cookie', cookie);

    expect(fetchRes.statusCode).toBe(200);

    // 🔎 Adjust based on your API response structure
    expect(Array.isArray(fetchRes.body.jobs)).toBe(true);
  });
});
