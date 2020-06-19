const { MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = ObjectID();
console.log('Coffee:', id);
console.log('Coffee:', id.getTimestamp());

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.error('Unable to connect database');
    }

    const db = client.db(databaseName);
    const usersCollection = db.collection('users');
    const tasksCollection = db.collection('tasks');

    //Add

    usersCollection.insertOne({
        _id: id,
        name: 'Test',
        age: 27
    }, (error, result) => {
        if (error) {
            return console.error('Unable to insert user');
        }

        console.log('Coffee:', result.ops);
    });

    usersCollection.insertMany([
        {
            name: 'Jen',
            age: 12
        },
        {
            name: 'Gunter',
            age: 22
        }
    ], (error, result) => {
        if (error) {
            return console.error('Unable to insert documents');
        }

        console.log('Coffee:', result.ops);
    });

    tasksCollection.insertMany([
        {
            description: 'Clean the house',
            completed: true
        },
        {
            description: 'Work',
            completed: true
        },
        {
            description: 'Cook dinner',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.error('Unable to insert tasks');
        }

        console.log('Coffee:', result.ops);
    });

    //Find

    usersCollection.findOne({ _id: new ObjectID("5ee8cf59bb70922aa9d6f1aa") }, (error, user) => {
        if (error) {
            return console.error('Unable to fetch');
        }

        console.log(user);
    });

    usersCollection.find({ age: 27 }).toArray((error, users) => {
        console.log('Users:', users);
    });

    tasksCollection.find({ _id: new ObjectID("5ee8deca80c3653670a1fcc7") }).toArray((error, tasks) => {
        console.log('Tasks:', tasks);
    });

    tasksCollection.find({ completed: false }).toArray((error, tasks) => {
        console.log('Uncompleted tasks:', tasks);
    });

    //Update

    usersCollection.updateOne({
        _id: new ObjectID("5ee8e46a97ea823a85989f57")
    }, {
        $inc: {
            age: 1
        }
    }).then(result => {
        console.log('Coffee result:', result);
    }).catch(error => {
        console.error('Coffee error:', error);
    });

    tasksCollection.updateOne({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log('Coffee result:', result.modifiedCount);
    }).catch(error => {
        console.error('Coffee error:', error);
    });

    //Delete

    usersCollection.deleteMany({
        age: 27
    }).then(result => {
        console.log('Coffee result:', result);
    }).catch(error => {
        console.error('Coffee error:', error);
    });

    tasksCollection.deleteMany({
        description: 'Clean the house'
    }).then(result => {
        console.log('Coffee result:', result);
    }).catch(error => {
        console.error('Coffee error:', error);
    });
});
