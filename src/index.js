const express = require('express');
const bodyParser = require('body-parser');
const Observable = require('./Observable');
const logSubscriber = require('./subscribers/logSubscriber');
const notifySubscriber = require('./subscribers/notifySubscriber');
const dbSubscriber = require('./subscribers/dbSubscriber');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Observable instance
const observable = new Observable();

// Register subscribers
observable.subscribe(logSubscriber);
observable.subscribe(notifySubscriber);
observable.subscribe(dbSubscriber);

// Endpoints

// POST / - Create a new resource
app.post('/', (req, res) => {
    const { name, createdAt } = req.body;

    if (!name || !createdAt) {
        return res.status(400).json({ error: 'name and createdAt are required' });
    }

    const resource = { name, createdAt };

    // Notify subscribers
    observable.notify(resource);

    res.status(201).json({
        message: 'Resource created',
        data: resource,
    });
});

// GET / - Retrieve all resources
app.get('/', (req, res) => {
    db.all('SELECT * FROM resources', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch resources' });
        }

        res.json({ data: rows });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
