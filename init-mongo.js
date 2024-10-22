const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:example@fifa-db-1:27017/';
const dbName = 'test'; 
const collectionName = 'jugadores';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db(dbName);
    const jugadores = JSON.parse(fs.readFileSync('./jugadores.json', 'utf8'));

    db.collection(collectionName).insertMany(jugadores, (err, res) => {
        if (err) throw err;
        console.log(`${res.insertedCount} jugadores inserted!`);
        client.close();
    });
});

