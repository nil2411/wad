const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let collection;

async function start() {
  await client.connect();
  const db = client.db('mydb');
  collection = db.collection('users');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}
start();

// Create
app.post('/users', async (req, res) => {
  const result = await collection.insertOne(req.body);
  res.send(result);
});

// Read
app.get('/users', async (req, res) => {
  const users = await collection.find().toArray();
  res.send(users);
});

// Update
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  // Convert the string ID from the frontend to ObjectId
  const objectId = new ObjectId(id);

  const result = await collection.updateOne(
    { _id: objectId },
    { $set: { name, email } }
  );

  res.send(result);
});

// Delete
app.delete('/users/:id', async (req, res) => {
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});
