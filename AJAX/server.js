const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'users.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Load existing users
let users = [];
if (fs.existsSync(DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(DATA_FILE));
}

// API endpoint to receive user data
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    
    // Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    
    res.status(200).send('User data received');
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'users.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Access the registration form at http://localhost:${PORT}/index.html`);
});