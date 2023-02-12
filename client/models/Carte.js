const { Schema, model, models } = require('mongoose');

const CarteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    origin: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});

const Carte = models.Carte || model('Carte', CarteSchema)
export default Carte;
