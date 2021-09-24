//process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../src/app.js');
const conn = require('../../../db/db.js');
const config = require('../../../config/app_config.json');

describe('POST /users', () => {

    before((done) => {
        conn.dbConnect(config.mongo_uri, 'test')
            .then(() => done())
            .catch((err) => done());
    })

    after((done) => {
        conn.dbClose()
            .then(() => done())
            .catch((err) => done());
    })

    it('OK, creating a new user', (done) => {
        request(app).post('/users')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
            .send({ name: "pratik", address: "chhindwara" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('statusCode');
                expect(body.data.name).to.equal('pratik');
                expect(body.data.address).to.equal('chhindwara');
                done();
            }).catch((err) => done(err));
    });

    it('OK, error while creating a new user', (done) => {
        request(app).post('/users')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
            .send({ nam: "pratik", address: "chhindwara" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('statusCode');
                expect(body.data.name).to.equal('ValidationError');
                done();
            }).catch((err) => done(err));
    });
});

describe('POST /oauth/token', () => {

    before((done) => {
        conn.dbConnect(config.mongo_uri, 'test')
            .then(() => done())
            .catch((err) => done());
    })

    after((done) => {
        conn.dbClose()
            .then(() => done())
            .catch((err) => done());
    })

    it('OK, creating a token', (done) => {
        request(app).post('/oauth/token')
            .send({ name: "name" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('access_token');
                expect(body).to.contain.property('token_type');
                expect(body).to.contain.property('statusCode');
                expect(body.statusCode).to.equal(200);
                expect(body.token_type).to.equal('jwt');
                done();
            }).catch((err) => done(err));
    });

});
