const { Schema, model, models } = require('mongoose');

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


const Category = models.Category || model('Category', CategorySchema)
export default Category;

