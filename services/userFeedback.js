const feedbackDao = require('../db/UserFeedbackDao');

const getUserFeedback = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const results = await feedbackDao.getFeedback(userId);
      resolve(results.length > 0 ? {code: 200, success: true, data: results} : {code: 400, success: false, data: results, message: `User ID ${userId} has no feedback.`});
    } catch(e) {
      reject(e);
    }
  });
};

const createUserFeedback = ({userId, rating, feedback, name, email}) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!userId || !rating || !feedback || !name || !email) {
        return resolve({code: 400, success: false, data: null, message: `${userId ? '': 'UserId '}${rating ? '': 'Rating '}${feedback ? '': 'Feedback '}${name ? '': 'Name '}${email ? '': 'Email '}missing.`});
      }
      const success = await feedbackDao.createFeedback({userId, rating, feedback, name, email});
      resolve(success ? {code: 201, success: true, data: null} : {code: 400, success: false, data: null, message: `User ID ${userId} has already submitted feedback.`});
    } catch(e) {
      reject(e);
    }
  });
};

const updateUserFeedback = ({userId, rating, feedback, name, email}) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!userId || !rating || !feedback || !name || !email) {
        return resolve({code: 400, success: false, data: null, message: `${userId ? '': 'UserId '}${rating ? '': 'Rating '}${feedback ? '': 'Feedback '}${name ? '': 'Name '}${email ? '': 'Email '}missing.`});
      }
      const code = await feedbackDao.updateFeedback({userId, rating, feedback, name, email});
      resolve({code, success: true, data: null});
    } catch(e) {
      reject(e);
    }
  });
};

const deleteUserFeedback = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const success = await feedbackDao.deleteFeedback(userId);
      resolve(success ? {code: 200, success: true, data: null} : {code: 404, success: false, data: null, message: `User ID ${userId} has not submitted a feedback previously.`});
    } catch(e) {
      reject(e);
    }
  });
};

module.exports = {
  getUserFeedback,
  createUserFeedback,
  updateUserFeedback,
  deleteUserFeedback,
};