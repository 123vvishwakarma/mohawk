const config = require('./config/app_config.json');
const db = require('./db/db');
const app = require('./src/app.js');
db.dbConnect(config.mongo_uri)
    .then(() => {
        app.listen(config.port, () => {
            console.log('Listening on port: ' + config.port);
        });
    });
