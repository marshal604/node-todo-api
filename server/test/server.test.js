const expect = require('expect'); // 測試期望值
const request = require('supertest'); // 測試post api
const { app } = require('../server'); // post api 主體

const { Todo } = require('../models/todo'); // todo schema

describe('Server Test Case', () => {
    beforeEach((done) => {
        Todo.remove({})
            .then(() => done())
            .catch(e => done(e));
    });
    it('POST /todos', (done) => {
        const text = 'go to bathroom';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((req, res) => {
                expect(req.body.text).toBe(text);
            })
            .end((err, res) => {
                // post error
                if (err) {
                    return done(err);
                }

                // check db have todo data
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(err));

            });
    });

    it('POST /todos error, because can not post empty object to todos', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err) => {
                if (err) {
                    return done(err);
                }
            });
        Todo.find().then(todos => {
            expect(todos.length).toBe(0);
            done();
        }).catch(err => done(err));
    });
})