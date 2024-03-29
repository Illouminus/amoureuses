const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    avatar: {type: String, required: false}
});

const User = models.User || model('User', UserSchema)
export default User;
