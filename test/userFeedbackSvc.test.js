const userFeedbackSvc = require('../services/userFeedback');
const userFeedbackDao = require('../db/UserFeedbackDao');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('getUserFeedback', () => {
  it('tests getUserFeedback - success', async() => {
    jest.spyOn(userFeedbackDao, 'getFeedback').mockResolvedValue([{
      name: 'Denise',
      rating: 4,
      feedback: 'maybe',
      email: 'mybirthdaytoo@email.com',
    }]);
    await expect(userFeedbackSvc.getUserFeedback(1)).resolves.toEqual({code: 200, success: true, data: [{
      name: 'Denise',
      rating: 4,
      feedback: 'maybe',
      email: 'mybirthdaytoo@email.com',
    }]});
  });

  it('tests getUserFeedback - fail', async() => {
    jest.spyOn(userFeedbackDao, 'getFeedback').mockResolvedValue([]);
    await expect(userFeedbackSvc.getUserFeedback(1)).resolves.toEqual({code: 400, success: false, data: []});
  });
});

describe('createUserFeedback', () => {
  it('tests createUserFeedback - success', async() => {
    jest.spyOn(userFeedbackDao, 'createFeedback').mockResolvedValue(true);
    await expect(userFeedbackSvc.createUserFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toEqual({code: 201, success: true, data: null});
  });

  it('tests createUserFeedback - fail', async() => {
    jest.spyOn(userFeedbackDao, 'createFeedback').mockResolvedValue(false);
    await expect(userFeedbackSvc.createUserFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toEqual({code: 400, success: false, data: null, message: 'User ID 99 has already submitted feedback.'});
  });
});

describe('updateUserFeedback', () => {
  it('tests updateUserFeedback - success', async() => {
    jest.spyOn(userFeedbackDao, 'updateFeedback').mockResolvedValue(200);
    await expect(userFeedbackSvc.updateUserFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toEqual({code: 200, success: true, data: null});
  });

  it('tests updateUserFeedback - fail', async() => {
    jest.spyOn(userFeedbackDao, 'updateFeedback').mockResolvedValue(201);
    await expect(userFeedbackSvc.updateUserFeedback({userId: 99, rating: 5, feedback: 'nil', name: 'XY', email: 'ABC'})).resolves.toEqual({code: 201, success: true, data: null});
  });
});

describe('deleteUserFeedback', () => {
  it('tests deleteUserFeedback - success', async() => {
    jest.spyOn(userFeedbackDao, 'deleteFeedback').mockResolvedValue(true);
    await expect(userFeedbackSvc.deleteUserFeedback(99)).resolves.toEqual({code: 200, success: true, data: null});
  });

  it('tests deleteUserFeedback - fail', async() => {
    jest.spyOn(userFeedbackDao, 'deleteFeedback').mockResolvedValue(false);
    await expect(userFeedbackSvc.deleteUserFeedback(99)).resolves.toEqual({code: 404, success: false, data: null, message: 'User ID 99 has not submitted a feedback previously.'});
  });
});