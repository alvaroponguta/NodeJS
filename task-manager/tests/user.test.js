const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { mockUserId, mockUser, setupDataBase } = require('./fixtures/db');

describe('User controller', () => {

    beforeEach(setupDataBase);

    it('Should signup a new user', async _ => {
        const response = await request(app).post('/users').send({
            name: 'Test',
            email: 'testsignup@test.com',
            password: 'TestPass123'
        }).expect(201);

        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();

        expect(response.body).toMatchObject({
            user: {
                name: 'Test',
                email: 'testsignup@test.com'
            },
            token: user.tokens[0].token
        })
        expect(user.password).not.toBe('TestPass123');
    });

    it('Should login existing user', async _ => {
        const response = await request(app).post('/users/login').send({
            email: mockUser.email,
            password: mockUser.password
        }).expect(200);

        const user = await User.findById(mockUserId);
        expect(response.body.token).toBe(user.tokens[1].token);
    });

    it('Should not login nonexistent user', async _ => {
        await request(app).post('/users/login').send({
            email: mockUser.email,
            password: 'wrongpass'
        }).expect(400);
    });

    it('Should get profile user', async _ => {
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send()
            .expect(200);
    });

    it('Should not get profile for unauthenticated user', async _ => {
        await request(app)
            .get('/users/me')
            .send()
            .expect(401);
    });

    it('Should delete profile user', async _ => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send()
            .expect(200);

        const user = await User.findById(mockUserId);
        expect(user).toBeNull();
    });

    it('Should not delete profile for unauthenticated user', async _ => {
        await request(app)
            .delete('/users/me')
            .send()
            .expect(401);
    });

    it('Should upload avatar image', async _ => {
        await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-picture.jpg')
            .expect(200);

        const user = await User.findById(mockUserId);
        expect(user.avatar).toEqual(expect.any(Buffer));
    });

    it('Should update valid user fields', async _ => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send({
                name: 'Update Test'
            })
            .expect(200);

        const user = await User.findById(mockUserId);
        expect(user.name).toEqual('Update Test');
    });

    it('Should not update invalid user fields', async _ => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
            .send({
                invalidField: 'Invalid Test'
            })
            .expect(400);
    });
});
