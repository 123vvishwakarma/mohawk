const config = require('../../../config/app_config.json');
const conn = require('../../../db/db.js');

describe('Database function call', () => {

    it('Database connection', (done) => {
        conn.dbConnect(config.mongo_uri)
            .then((res) => {
                done();
            });
    });
});


