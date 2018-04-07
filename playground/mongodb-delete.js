const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Success! Connect to the MongoDB Server');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteOne({ text: 'eat dinner' }).then((result) => {
    //     console.log('Success to delete\n', result);
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // }).catch(err => {
    //     console.log('Unable to delete Todos item');
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // });

    // db.collection('Todos').deleteMany({ text: 'eat dinner' }).then((result) => {
    //     console.log('Success to delete\n', result);
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // }).catch(err => {
    //     console.log('Unable to delete Todos items');
    //     // 做完事情了, 關閉連線數據庫
    //     client.close();
    // });

    db.collection('Todos').findOneAndDelete({ _id: new ObjectID('5ac86802797d6f06fd2ada49') }).then((result) => {
        console.log('Success to delete\n', result.value);
        // 做完事情了, 關閉連線數據庫
        client.close();
    }).catch(err => {
        console.log('Unable to delete Todos items');
        // 做完事情了, 關閉連線數據庫
        client.close();
    });
});