const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect Mongodb server');
    }
    console.log('Success! Connect to MongoDB server');

    const db = client.db('TodoApp');

    /* search all data from Todos */
    // db.collection('Todos').find().toArray().then((res) => {
    //     console.log('data:\n', res);
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // }).catch(err => {
    //     console.log('can not find the collection Todos');
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // });

    /* get the equal _id data */
    // db.collection('Todos').find({ _id: new ObjectID('5ac87dbc4382a30458a69ae3') }).toArray().then((res) => {
    //     console.log('data:\n', res);
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // }).catch(err => {
    //     console.log('can not find the collection Todos');
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // });

    /* count the Todos data */
    db.collection('Todos').find().count().then(count => {
        console.log(`Todos data count is ${count}`);
        // 做完事情了, 關閉連線數據庫
        client.close();
    }).catch(err => {
        console.log('Unable to fetch data', err);
        // 做完事情了, 關閉連線數據庫
        client.close();
    });


})