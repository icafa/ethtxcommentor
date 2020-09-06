const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

/**
 * Comment Schema
 * @private
 */
const commentSchema = new mongoose.Schema({  hash: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  username: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  text: {
    type: String,
    maxlength: 128,
  }
}, {
  timestamps: true,
});

/**
 * Statics
 */
commentSchema.statics = {

  /**
   * List comments in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of comments to be skipped.
   * @param {number} limit - Limit number of comments to be returned.
   * @returns {Promise<Comment[]>}
   */
  list({
    page = 1, perPage = 30, hash,
  }) {
    const options = omitBy({ hash }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Comment
 */
module.exports = mongoose.model('Comment', commentSchema);
