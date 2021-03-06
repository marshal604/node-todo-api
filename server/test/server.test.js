const expect = require('expect'); // 測試期望值
const request = require('supertest'); // 測試post api
const { app } = require('../server'); // post api 主體
const { ObjectID } = require('mongodb');
const { Todo } = require('../models/todo'); // todo schema

describe('Server Test Case', () => {
    const todos = [
        {
            _id: new ObjectID,
            text: 'first'
        },
        {
            _id: new ObjectID,
            text: 'second'
        }
    ];
    const id = new ObjectID();
    beforeEach((done) => {
        Todo.remove({})
            .then(() => Todo.insertMany(todos))
            .then(() => done())
            .catch(e => done(e));
    });
    it('POST /todos', (done) => {
        const text = 'go to bathroom';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                // post error
                if (err) {
                    return done(err);
                }

                // check db have todo data
                Todo.find({ text }).then((todos) => {
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
            expect(todos.length).toBe(2);
            done();
        }).catch(err => done(err));
    });

    it('GET /todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
    it('GET /todos:id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toEqual(todos[0]._id);
                expect([res.body].length).toBe(1);
            })
            .end(done);
    });

    it('GET /todo:id, expect status code is 404 if id is not valid', (done) => {
        const notValidId = '123';
        request(app)
            .get(`/todos/${notValidId}`)
            .expect(400)
            .end(done);
    });

    it('GET /todo:id, expect status code is 404 if response object is empty', (done) => {
        const testId = new ObjectID();
        request(app)
            .get(`/todos/${testId}`)
            .expect(404)
            .end(done);
    });

    it('Delete /todo:id', (done) => {
        const id = todos[0]._id;
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toEqual(id);
                expect([res.body].length).toBe(1);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(id).then(doc => {
                    expect(doc).toNotExist();
                    done();
                }).catch(e => done(e));
            });
    });

    it('Delete /todo:id, expect status code is 404 if id is not valid', (done) => {
        const isNotValidId = '123';
        request(app)
            .delete(`/todos/${isNotValidId}`)
            .expect(400)
            .end(done);
    });

    it('Delete /todo:id, expect status code is 404 if response object is empty', (done) => {
        const testId = new ObjectID();
        request(app)
            .delete(`/todos/${testId}`)
            .expect(404)
            .end(done);
    });

    it('PATCH /todo/:id', (done) => {
        const id = todos[0]._id;
        const text = encodeURIComponent('just test');
        const completed = true;
        request(app)
            .patch(`/todos/${id}`)
            .expect(200)
            .send({ text, completed })
            .expect((res) => {
                expect(res.body).toInclude({
                    _id: id,
                    text: text,
                    completed: completed
                });
            })
            .end(done);
    });

    it('PATCH /todo/:id, expect status code is 404 if id is not valid', (done) => {
        const isNotValidId = '123';
        const text = encodeURIComponent('just test');
        const completed = true;
        request(app)
            .patch(`/todos/${isNotValidId}`)
            .expect(400)
            .send({ text, completed })
            .end(done);
    });

    it('PATCH /todo/:id, expect status code is 404 if response object is empty', (done) => {
        const id = new ObjectID();
        const text = encodeURIComponent('just test');
        const completed = true;
        request(app)
            .patch(`/todos/${id}`)
            .expect(404)
            .send({ text, completed })
            .end(done);
    });
});