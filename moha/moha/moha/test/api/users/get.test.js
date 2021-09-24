const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../src/app.js');
const conn = require('../../../db/db.js');
const config = require('../../../config/app_config.json');

describe('GET /users', () => {

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

    it('OK, get no user', (done) => {
        request(app).get('/users')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('statusCode');
                expect(body.data.length).to.equal(0);
                done();
            }).catch((err) => done(err));
    });

    it('OK, get one user', (done) => {
        request(app).post('/users')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
            .send({ name: "pratik", address: "chhindwara" })
            .then((res) => {
                request(app).get('/users')
                    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
                    .then((res) => {
                        const body = res.body;
                        expect(body).to.contain.property('data');
                        expect(body).to.contain.property('statusCode');
                        expect(body.data.length).to.equal(1);
                        done();
                    }).catch((err) => done(err));
            }).catch((err) => done(err));
    });

    it('OK, authorization failed', (done) => {
        request(app).get('/users')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCIkpXVCJ9.eyJuYW1lIjoibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('statusCode');
                expect(body.message).to.equal('Unauthorized');
                done();
            }).catch((err) => done(err));
    });
});
