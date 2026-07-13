REST API Questions - Books Endpoint
---
Given Code:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'Moby Dick', author: 'Herman Melville' }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

app.listen(PORT);
```

Part 1: Endpoint Identification
---
1. What HTTP method and endpoint URL would you use to retrieve the entire list of books?

```
GET http://localhost:3000/books
```
2. How would you retrieve details of the book with an id of 2?
   
```
GET http://localhost:3000/books/2
```

Part 2: Code Analysis
---

1. How is the specific book ID obtained from the request?

```javascript
const book = books.find(b => b.id === parseInt(req.params.id));
```

2. What is the purpose of the line `if (!book) return res.status(404).send('Book not found’);`?

Solution:
This line handles the case where a requested book does not exist.

Purpose Breakdown:

- `if (!book)` - Checks if the book variable is undefined (which happens when books.find() doesn't find a match)
- `return` - Stops further execution of the handler function so the response is sent immediately
- `res.status(404)` - Sets the HTTP status code to 404 Not Found
- `.send('Book not found')` - Sends the error message back to the client as the response body

Part 3: Enhancement - Update Endpoint
---
If you were to add an `endpoint` to update the title of a specific book, sketch a possible endpoint definition for this operation. Consider `HTTP methods`, `request structure`, and `potential error handling`.


```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'Moby Dick', author: 'Herman Melville' }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a specific book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// PUT (Update) a specific book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    const { title, author } = req.body;
    
    if (!title && !author) {
        return res.status(400).json({ 
            message: 'At least one field (title or author) is required' 
        });
    }
    
    if (title) {
        books[bookIndex].title = title;
    }
    if (author) {
        books[bookIndex].author = author;
    }
    
    res.json({
        message: 'Book updated successfully',
        book: books[bookIndex]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

```