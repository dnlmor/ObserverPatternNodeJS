const db = require('../db');

module.exports = (data) => {
    const { name, createdAt } = data;

    db.run(
        `INSERT INTO resources (name, createdAt) VALUES (?, ?)`,
        [name, createdAt],
        (err) => {
            if (err) {
                console.error('DB Subscriber: Error saving resource to database:', err);
            } else {
                console.log('DB Subscriber: Resource saved to database');
            }
        }
    );
};
