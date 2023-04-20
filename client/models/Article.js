const { Schema, model, models } = require('mongoose');
import Block from './BlockSchema'

const ArticleSchema = new Schema({
    blocks: {
        type: [Block.schema],
        required: false,
    },
});

const Article = models.Article || model('Article', ArticleSchema)
export default Article;
