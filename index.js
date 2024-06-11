const express = require('express');
require('dotenv').config();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const htmlRoutes = require('./routes/index');
const userRoutes = require('./routes/api/userRoutes');
const productRoutes = require('./routes/api/productRoutes');
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

app.use('/', htmlRoutes); // routes for html
app.use('/api/users', userRoutes); // routes for api user
app.use('/api/product', productRoutes); // routes for api user

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
