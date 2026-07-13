Topic 5 Questions
---
1. Initialize an Express.js application and set up the necessary middleware to use EJS as the templating engine.

**Solution**

```javascript
const express = require('express');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Optional: specify views directory

// Middleware to serve static files (optional)
app.use(express.static('public'));
```
---
2. Create a middleware function that logs to the console the date (in YYYY-MM-DD format) and request method (e.g., GET, POST) for every request to the server.

**Solution**
```javascript
// Middleware to log date and request method
app.use((req, res, next) => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    console.log(`${formattedDate} - ${req.method} request to ${req.url}`);
    next();
});
```
---
3. Given an array of users:
```Javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
```
Set up an endpoint /users that renders an EJS template to display the list of users.

**Solution**

```javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' } // Added for demonstration
];

// Endpoint to render users list
app.get('/users', (req, res) => {
    res.render('users', { users });
});
```

**EJS Template** (`views/users.ejs`):
```html
<!DOCTYPE html>
<html>
<head>
    <title>Users List</title>
</head>
<body>
    <h1>Users</h1>
    <ul>
        <% users.forEach(user => { %>
            <li><%= user.id %>: <%= user.name %></li>
        <% }) %>
    </ul>
</body>
</html>
```

**Complete Server**:
```javascript
const express = require('express');
const app = express();
const port = 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Logging middleware
app.use((req, res, next) => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    console.log(`${formattedDate} - ${req.method} request to ${req.url}`);
    next();
});

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```
---
4. Identify whether the following JavaScript code is synchronous or asynchronous. Explain your reasoning.

```Javascript
function foo() {
    console.log('Hello,');
}

function bar() {
    setTimeout(function () { 
        console.log('World!');
    }, 1000);
}

foo();
bar();  
```
The provided code is **asynchronous** because:

```javascript
function foo() {
    console.log('Hello,');  // Synchronous
}

function bar() {
    setTimeout(function () {  // Asynchronous
        console.log('World!');
    }, 1000);
}

foo();  // Executes immediately
bar();  // Starts timer, doesn't block execution
```

**Explanation:**
- `foo()` is synchronous - it executes immediately
- `bar()` contains `setTimeout()` which is asynchronous - it schedules the callback to execute after 1000ms but doesn't block the main thread
- **Output order:** "Hello," appears immediately, then "World!" appears after 1 second
- The `setTimeout` function is asynchronous because it uses the event loop to defer execution, allowing other code to run in the meantime

**Console Output:**
```
Hello,
(1 second delay)
World!
```


