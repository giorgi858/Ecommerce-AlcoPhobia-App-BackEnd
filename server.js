require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3900;
const { logger } = require('./middleware/logEvents');
const path = require('path')
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const conndb = require('./config/conndb');
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const verifyJWY = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')


conndb();
//middleware
app.use(logger);
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use(express.static('public'));

//routes 
app.use('/', require('./routes/main'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWY)
app.use('/employee', require('./routes/API/employee'));
app.use('/user', require('./routes/API/user'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({'error': '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open',() => {
    console.log('connected to DB'),
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
})

