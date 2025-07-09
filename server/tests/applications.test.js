const request = require('supertest');
const app = require('../index'); // adjust path to your Express app

let referrerCookie;
let seekerCookie;
let createdJobId;

beforeAll(async () => {
  // 🔑 Login as referrer
  const referrerRes = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'referrer@test.com', password: 'password123' });

  referrerCookie = referrerRes.headers['set-cookie'];

  // 🔑 Login as seeker
  const seekerRes = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'seeker@test.com', password: 'password123' });

  seekerCookie = seekerRes.headers['set-cookie'];

  // 🔥 Create a job as company (optional if job exists)
  const jobRes = await request(app)
    .post('/api/jobs/')
    .set('Cookie', referrerCookie) // if referrer can post jobs, else use companyCookie
    .send({
      title: 'Test Job for Applications',
      description: 'Job description',
      location: 'Remote',
      skills: ['Node.js'],
      experienceRequired: 1,
      company: 'Test Company',
    });



  createdJobId = jobRes.body.job._id;
});

describe('Applications and Referral Claims Routes', () => {

  // 🔥 1. Claim job as referrer
  it('should allow referrer to claim a job for referral', async () => {
    const res = await request(app)
      .post(`/api/${createdJobId}/claim`)
      .set('Cookie', referrerCookie)
      .send({
          jobId: createdJobId,
        contactInfo: 'referrer@test.com',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.claim).toBeDefined();
    expect(res.body.claim.job).toBe(createdJobId);
  });

  // 🔥 2. Apply to job as seeker (success)
  it('should allow seeker to apply to a job successfully', async () => {
    const res = await request(app)
      .post(`/api/applications/apply`)
      .set('Cookie', seekerCookie)
      .send({
          jobId: createdJobId,
        resumeUrl: 'https://example.com/resume.pdf',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.application).toBeDefined();
    expect(res.body.application.job).toBe(createdJobId);
  });

  // 🔥 3. Apply to job without resume (should fail)
  it('should fail applying to a job without resume', async () => {
    const res = await request(app)
      .post(`/api/applications/apply`)
      .set('Cookie', seekerCookie)
      .send({});

    expect(res.statusCode).toBe(400); // adjust if your validation returns different code
    expect(res.body.message).toMatch(/resume/i); // adjust based on your error message
  });

});
