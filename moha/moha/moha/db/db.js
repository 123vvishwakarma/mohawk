const mongoose = require('mongoose');

dbConnect = (mongo_uri, NODE_ENV = null) => {
    return new Promise((resolve, reject) => {
        if (NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    mongoose.connect(mongo_uri)
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                })
        } else {
            mongoose.connect(mongo_uri)
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve(res);
                });
        }
    });
}

dbClose = () => {
    return mongoose.disconnect();
}
module.exports = { dbConnect, dbClose };
