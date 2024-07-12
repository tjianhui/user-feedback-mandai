const db = require('../middleware/db');

const isUserFeedbackExists = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const result = await db`SELECT user_id FROM UserFeedback WHERE user_id = ${userId}`;
      resolve(result.length > 0);
    } catch(e) {
      reject(e);
    }
  });
};

const getFeedback = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const results = await db`SELECT * FROM UserFeedback WHERE user_id = ${userId};`;
      resolve(results);
    } catch(e) {
      reject(e);
    }
  });
};

const createFeedback = ({userId, rating, feedback, name, email}) => {
  return new Promise(async(resolve, reject) => {
    try {
      const exists = await isUserFeedbackExists(userId);
      if (exists) {
        resolve(false);
      } else {
        await db`INSERT INTO UserFeedback(user_id, rating, feedback, email, name) 
                SELECT ${userId}, ${rating}, ${feedback}, ${email}, ${name} 
                WHERE NOT EXISTS(SELECT user_id FROM UserFeedback WHERE user_id = ${userId});`;
        resolve(true);
      }
    } catch(e) {
      reject(e);
    }
  });
};

const updateFeedback = ({userId, rating, feedback, name, email}) => {
  return new Promise(async(resolve, reject) => {
    try {
      const exists = await isUserFeedbackExists(userId);
      if (exists) {
        await db`UPDATE UserFeedback SET user_id = ${userId},
                                        rating = ${rating},
                                        feedback = ${feedback},
                                        name = ${name},
                                        email = ${email}
                                    WHERE user_id = ${userId};`;
        resolve(200);
      } else {
        await db`INSERT INTO UserFeedback(user_id, rating, feedback, email, name) 
                  SELECT ${userId}, ${rating}, ${feedback}, ${email}, ${name} 
                  WHERE NOT EXISTS(SELECT user_id FROM UserFeedback WHERE user_id = ${userId});`;
      }
      resolve(201);
    } catch(e) {
      reject(e);
    }
  });
};

const deleteFeedback = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const exists = await isUserFeedbackExists(userId);
      if (exists) {
        await db`DELETE FROM UserFeedback WHERE user_id = ${userId};`;
        resolve(true);
      } else {
        resolve(false);
      }
    } catch(e) {
      reject(e);
    }
  });
};

module.exports = {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  isUserFeedbackExists,
};