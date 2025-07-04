const express = require('express');
const app = express();
require('dotenv').config();


app.use('/', require('./routes'));


const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${process.env.PORT || port}`);
});

//database connection
const {MongoClient} = require('mongodb');

async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        await listDatabases(client);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

    finally {
        await client.close();
    }
}



async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

main().catch(console.error);