const userFeedbackDao = require('../db/UserFeedbackDao');
jest.mock('../middleware/db');
const db = require('../middleware/db');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('isUserExists', () => {
  it('tests isUserExists - true', async() => {
    db.mockResolvedValue([{user_id: 42}]);
    await expect(userFeedbackDao.isUserFeedbackExists(42)).resolves.toBe(true);
  });
  
  it('tests isUserExists - false', async() => {
    db.mockResolvedValue([]);
    await expect(userFeedbackDao.isUserFeedbackExists(42)).resolves.toBe(false);
  });
});

describe('getFeedback', () => {
  it('tests getFeedback - success', async() => {
    db.mockResolvedValue([{
      name: 'Denise',
      rating: 4,
      feedback: 'maybe',
      email: 'mybirthdaytoo@email.com',
    }]);
    await expect(userFeedbackDao.getFeedback(1)).resolves.toEqual([{
      name: 'Denise',
      rating: 4,
      feedback: 'maybe',
      email: 'mybirthdaytoo@email.com',
    }]);
  });

  it('tests getFeedback - fail', async() => {
    db.mockResolvedValue([]);
    await expect(userFeedbackDao.getFeedback(1)).resolves.toEqual([]);
  });
});

describe('createFeedback', () => {
  it('tests createFeedback - success', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([]);
    await expect(userFeedbackDao.createFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toBe(true);
  });

  it('tests createFeedback - fail', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([{user_id: 99}]);
    await expect(userFeedbackDao.createFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toBe(false);
  });
});

describe('updateFeedback', () => {
  it('tests updateFeedback - updated', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([{user_id: 99}]);
    await expect(userFeedbackDao.updateFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toBe(200);
  });

  it('tests updateFeedback - created', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([]);
    await expect(userFeedbackDao.updateFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toBe(201);
  });
});

describe('deleteFeedback', () => {
  it('tests deleteFeedback - success', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([{user_id: 99}]);
    await expect(userFeedbackDao.deleteFeedback(99)).resolves.toBe(true);
  });

  it('tests deleteFeedback - fail', async() => {
    db.mockResolvedValue().mockResolvedValueOnce([]);
    await expect(userFeedbackDao.deleteFeedback(99)).resolves.toBe(false);
  });
});