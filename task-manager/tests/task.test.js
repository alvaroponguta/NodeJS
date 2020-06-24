const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
    mockUser,
    mockOtherUser,
    mockTask,
    setupDataBase
} = require('./fixtures/db');

describe('Task controller', () => {

    beforeEach(setupDataBase);

    it('Should create task for user', async _ => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send({
                description: 'Test description',
            }).expect(201);

        const task = await Task.findById(response.body._id);
        expect(task).not.toBeNull();
        expect(task.completed).toEqual(false);
    });

    it('Should fetch user tasks', async _ => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send()
            .expect(200);

        expect(response.body.length).toEqual(1);
    });

    it('Should not delete other user tasks', async _ => {
        await request(app)
            .delete(`/tasks/${mockTask._id}`)
            .set('Authorization', `Bearer ${mockOtherUser.tokens[0].token}`)
            .send({
                description: 'Test description',
            }).expect(404);

        const task = await Task.findById(mockTask._id);
        expect(task).not.toBeNull();
    });
});
