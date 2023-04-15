const { Schema, model, models } = require('mongoose');

const TastingSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    places: {
        type: Number,
        required: false,
        default: 10
    },
    photo: {
        type: String,
        required: false,
    },
});

const Tasting = models.Tasting || model('Tasting', TastingSchema)
export default Tasting;
