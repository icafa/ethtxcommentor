const express = require('express');
const controller = require('../../controllers/comment.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();


router
  .route('/')
  .get(authorize('user'), controller.list)
  .post(authorize('user'), controller.create);

module.exports = router;
