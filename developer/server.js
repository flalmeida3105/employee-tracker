const express = require("express");
const db = require('../db/connection');
const InitializeQuestions = require('../app');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// adding express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Setting a default response if the request it's not supported by the app
app.use((req, res) => {
    res.status(404).end();
})

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

InitializeQuestions();

