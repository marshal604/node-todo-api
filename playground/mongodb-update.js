const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Success! Connect to the MongoDB Server');

    const db = client.db('TodoApp');

    db.collection('Users')
        .findOneAndUpdate(
            {
                _id: new ObjectID('5ac86bec01d64807902d8b4d')
            },
            {
                $inc: {
                    age: 1
                }
            },
            {
                returnOriginal: false
            }).then((result) => {
                console.log('success update the user age', result);
                // 做完事情了, 關閉連線數據庫
                client.close();
            });
});