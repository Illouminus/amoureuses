const { Schema, model, models } = require('mongoose');

const BlockSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    src: {
        type: String,
        required: false,
    },
    alt: {
        type: String,
        required: false,
    },
});

const Block = models.Block || model('Block', BlockSchema)
export default Block;
