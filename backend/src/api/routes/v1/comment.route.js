const express = require('express');
const controller = require('../../controllers/comment.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();


router
  .route('/')
  .get(authorize(LOGGED_USER), controller.list)
  .post(authorize(LOGGED_USER), controller.create);

module.exports = router;
