const httpStatus = require('http-status');
const Comment = require('../models/comment.model');

/**
 * Create new comment
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    res.status(httpStatus.CREATED);
    res.json(savedComment);
  } catch (error) {
    next(Comment.checkDuplicateEmail(error));
  }
};

/**
 * Get comment list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const comments = await Comment.list(req.query);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};
