// Store users in local storage
const STORAGE_KEY = 'registeredUsers';

// Function to get all users from local storage
function getUsers() {
    const usersJSON = localStorage.getItem(STORAGE_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// Function to save a user
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Send to server via AJAX
    sendToServer(user);
}

// Function to send user data to server
function sendToServer(user) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('User data sent to server successfully');
            } else {
                console.error('Error sending data to server:', xhr.statusText);
            }
        }
    };
    
    xhr.send(JSON.stringify(user));
}

// Registration form handling
if (document.getElementById('registrationForm')) {
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            timestamp: new Date().toISOString()
        };
        
        saveUser(user);
        alert('Registration successful!');
        this.reset();
    });
}

// Display users on users.html
if (document.getElementById('usersTableBody')) {
    const users = getUsers();
    const tableBody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No users registered yet</td></tr>';
    } else {
        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${user.dob || 'N/A'}</td>
            </tr>
        `).join('');
    }
}