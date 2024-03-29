const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const db = require('./models');

const app = express();
const { PORT } = process.env;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', routes);

app.get('/', function (req, res) {
    res.redirect('/app');
});

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    console.error(err.message);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

db.sequelize
    .authenticate()
    .then(function () {
        console.log('Connected to db');
        app.listen(PORT, function () {
            console.log(`Server is up!!!!\nListening on port ${PORT}`);
        });
    })
    .catch(function (err) {
        console.log('Could not connect to db', err);
    })
