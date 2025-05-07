const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public')); // <-- Serve static files from /public

const uri = "mongodb://localhost:27017";
const dbName = "myDatabase";
let usersCollection;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    usersCollection = client.db(dbName).collection('users');
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Optional root route
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await usersCollection.insertOne({ name, email });
  res.status(201).json({ message: 'User created', id: result.insertedId });
});

app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, email } }
  );
  result.matchedCount ? res.json({ message: 'User updated' }) : res.status(404).json({ message: 'User not found' });
});

app.delete('/users/:id', async (req, res) => {
  const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  result.deletedCount ? res.json({ message: 'User deleted' }) : res.status(404).json({ message: 'User not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
