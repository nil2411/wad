const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors(), express.json());

const client = new MongoClient('mongodb://localhost:27017');
let users;

(async () => {
  await client.connect();
  users = client.db('mydb').collection('users');
  app.listen(3000, () => console.log('Server: http://localhost:3000'));
})();

app.post('/users', async (req, res) => res.send(await users.insertOne(req.body)));

app.get('/users', async (_, res) => res.send(await users.find().toArray()));

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  res.send(await users.updateOne({ _id: new ObjectId(id) }, { $set: req.body }));
});

app.delete('/users/:id', async (req, res) => {
  res.send(await users.deleteOne({ _id: new ObjectId(req.params.id) }));
});
