const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect Mongodb server');
    }
    console.log('Success! Connect to MongoDB server');

    /* 將db指向TodoApp這個database */
    // const db = client.db('TodoApp');
    /* insert is deprecate so use insertOne (document is one) */
    // db.collection('Todos').insertOne({
    //     text: 'Hello! Today is cloud day.',
    //     completed: false
    // }, null, (err, result) => {
    //     if (err) {
    //         return console.log('insert data error');
    //     }
    //     console.log('result', JSON.stringify(result.ops, undefined, 2));
    // });

    /* do insert user to db, content is name: string, age: number, location: string */
    // db.collection('Users').insertOne({
    //     name: 'YUR',
    //     age: 25,
    //     location: 'Taiwan'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert the user data');
    //     }
    //     console.log(`Success! Insert the user data in ${result.ops[0]._id.getTimestamp()}:`, JSON.stringify(result.ops, undefined, 2));
    // });

    // 做完事情了, 關閉連線數據庫
    client.close();
})