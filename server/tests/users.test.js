const request = require('supertest');
const app = require('../index'); // adjust path to your Express app

describe('User Auth Routes', () => {
  let testEmail = `testuser${Date.now()}@example.com`; // unique email for signup test
  const password = 'password123';

  // 🔥 Signup - success
  it('should signup a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/signup') // ✅ adjust to your signup route
      .send({
        name: 'Test User',
        email: testEmail,
        password: password,
        isCompany: false, // adjust based on your signup logic

      });

    expect(res.statusCode).toBe(201); 
    expect(res.body.user).toBeDefined();
expect(res.body.user.email).toBe(testEmail);

  });


  it('should fail signup with missing password', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: `fail${Date.now()}@example.com`,
        // password missing intentionally
      });

    expect(res.statusCode).toBe(400); 
 expect(res.body.message).toMatch(/required fields/i);
 
  });

  // 🔥 Login - success
  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/signin') 
      .send({
        email: testEmail,
        password: password,
      });

    expect(res.statusCode).toBe(200); // adjust if different
       expect(res.body.user.email).toBe(testEmail);
  });

  // 🔥 Login - wrong password
  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: testEmail,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401); // adjust based on your error handling
    expect(res.body.message).toMatch(/invalid/i); // adjust based on your error message
  });
});
