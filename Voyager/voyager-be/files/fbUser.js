const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facebookId: String,
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

const findOne = (facebookId) => {
    return User.findOne({facebookId}).exec();
};

const save = (userData) => {
    const newUser = new User(userData);
    return newUser.save();
};

module.exports = {
    User,
    findOne,
    save
};
