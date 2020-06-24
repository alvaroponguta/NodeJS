const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const mockUserId = new mongoose.Types.ObjectId();
const mockUser = {
    _id: mockUserId,
    name: 'Test',
    email: 'test@test.com',
    password: 'TestPass123',
    tokens: [{
        token: jwt.sign({ _id: mockUserId }, process.env.JWT_SECRET)
    }]
}

const mockOtherUserId = new mongoose.Types.ObjectId();
const mockOtherUser = {
    _id: mockOtherUserId,
    name: 'Other Test',
    email: 'other-test@test.com',
    password: 'TestPass123',
    tokens: [{
        token: jwt.sign({ _id: mockOtherUserId }, process.env.JWT_SECRET)
    }]
}

const mockTask = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task',
    completed: false,
    owner: mockUser._id
}

const setupDataBase = async _ => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(mockUser).save();
    await new User(mockOtherUser).save();
    await new Task(mockTask).save();
}

module.exports = {
    mockUserId,
    mockUser,
    mockOtherUserId,
    mockOtherUser,
    mockTask,
    setupDataBase
};