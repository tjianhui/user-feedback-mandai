const express = require('express');
const router = express.Router();
const feedbackSvc = require('../services/userFeedback');

router.get('/:userId/feedback', async(req, res) => {
  try {
    const {code, ...result} = await feedbackSvc.getUserFeedback(req.params.userId);
    res.status(code).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).json({'error': e.message});
  }
});

router.post('/:userId/feedback', async(req, res) => {
  try {
    const {code, ...result} = await feedbackSvc.createUserFeedback({...req.body, userId: req.params.userId});
    res.status(code).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).json({'error': e.message});
  }
});

router.put('/:userId/feedback', async(req, res) => {
  try {
    const {code, ...result} = await feedbackSvc.updateUserFeedback({...req.body, userId: req.params.userId});
    res.status(code).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).json({'error': e.message});
  }
});

router.delete('/:userId/feedback', async(req, res) => {
  try {
    const {code, ...result} = await feedbackSvc.deleteUserFeedback(req.params.userId);
    res.status(code).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).json({'error': e.message});
  }
});

module.exports = router;