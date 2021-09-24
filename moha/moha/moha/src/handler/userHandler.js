const jwt = require('jsonwebtoken');
const config = require('../../config/app_config.json');
const UserInfo = require('../../db/models/userInfo').UserInfo;

createToken = (req, res) => {
    const token = jwt.sign(req.body, config.secret_key, { expiresIn: config.jwtExpireIn });
    res.status(200).send({ access_token: token, token_type: 'jwt', statusCode: 200 });
}

createUser = (req, res) => {
    const body = req.body;
    const userInfo = new UserInfo({
        name: body.name,
        address: body.address
    })
    userInfo.save(userInfo)
        .then((user) => res.status(200).send({ data: user, statusCode: 200 }))
        .catch((err) => res.status(400).send({ data: err, statusCode: 400 }));
}

getUser = (req, res) => {
    UserInfo.find()
        .then((users) => res.status(200).send({ data: users, statusCode: 200 }))
        .catch((err) => res.status(400).send({ data: err, statusCode: 400 }));
}

module.exports = { createToken, createUser, getUser };
