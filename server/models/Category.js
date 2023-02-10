const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Article',
  }],
});

module.exports = model('CategoryMNG', CategorySchema)