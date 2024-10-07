import request from 'supertest';
import app from '../server.js';

describe('Express App', () => {
  // Test the root API route
  it('------------------should return API is working------------------', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'API is working');
  });

  // Test the 404 route
  it('------------------should return 404 for undefined routes------------------', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });

  // Test error handling middleware
  it('------------------should handle errors------------------', async () => {
    // Simulate an error by calling an invalid route
    app.use('/error', (req, res, next) => {
      const error = new Error('Forced Error');
      next(error);
    });
    const res = await request(app).get('/error');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });
});