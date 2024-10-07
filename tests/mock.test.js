import { jest } from '@jest/globals';

// Mock the User model
jest.unstable_mockModule('../models/user.model.js', () => ({
  default: {
    getAll: jest.fn(),
  },
}));

// Import the controller after mocking
const { findAll } = await import('../controllers/CUser.js');

describe('User Controller', () => {
  describe('findAll', () => {
    it('-------------------------should return all users-------------------------', async () => {
      const mockUsers = [
        { number: 1, names: 'John Doe' }
      ];

      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Import the mocked User model
      const { default: User } = await import('../models/user.model.js');

      // Mock the getAll method
      User.getAll.mockImplementation((callback) => {
        callback(null, mockUsers);
      });

      // Call the findAll function
      findAll(req, res);

      // Assertions
      expect(User.getAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(mockUsers);
      expect(res.send.mock.calls[0][0]).toEqual(mockUsers);
    });

    it('-------------------------should handle errors-------------------------', async () => {
      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Import the mocked User model
      const { default: User } = await import('../models/user.model.js');

      // Mock the getAll method to simulate an error
      User.getAll.mockImplementation((callback) => {
        callback(new Error('Database error'), null);
      });

      // Call the findAll function
      await findAll(req, res);

      // Assertions
      expect(User.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Database error',
      });
    });
  });
});