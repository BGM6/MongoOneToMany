const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const PORT = 5000;
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const farmRoutes = require('./routes/farmRoutes');
const app = express();

//mongoose
mongoose.connect('mongodb://localhost:27017/FarmProduct', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('Database Connected!'));

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

//ejs setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use('/products', productRoutes)
app.use('/farms', farmRoutes)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));