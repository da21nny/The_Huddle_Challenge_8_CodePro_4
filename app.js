const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('404');
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:3000'));