const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema)

module.exports = { UserInfo };
