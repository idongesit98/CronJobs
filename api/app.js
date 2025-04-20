const express = require('express'); 
const app = express();
const path = require('path');
const BirthdayRoute = require('./Routes/birthday_routes');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index'); // Renders index.ejs
});

app.get('/create', (req, res) => {
    res.render('create'); // Renders create.ejs
});

app.use('/birthday', BirthdayRoute);

app.use((error, req, res, next) => {
    console.log("Error Handling Middleware called");
    console.log('Path:', req.path);
    console.log('Error:', error);

    if (error.type === 'NOT_FOUND') {
        res.status(404).send(error);
    } else {
        res.status(500).send(error);
    }

    next();
});

module.exports = app;
