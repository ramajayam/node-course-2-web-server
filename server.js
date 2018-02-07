// import { dirname } from 'path';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3005;

var app = express();

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var data = `${req.method}, ${req.url}`;
    fs.appendFile('server.log', now + "; " + data + "\n", (err) => {
        if (err) throw err;
        console.log('data added to the file.');
    });
    next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: "Maintenance Page",
        welcomeMessage: "Site is being updated"
    });
    next();
});


hbs.registerHelper('screamIt', (inputMsg)=>{
    return inputMsg.toUpperCase();
});

app.get('/', (req, res)=>{
    // res.send("<h1>Hello Express</h1>");
    // res.send({
    //     name: "Rikki",
    //     age: 2
    // });
    res.render('home.hbs', {
        pageTitle: "Home Page",
        // year: new Date().getFullYear(),
        welcomeMessage: "Welcome to my new website"
    });
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    // res.render('about.hbs');
    res.render('about.hbs', {
        pageTitle: "HandleBar Dynamic Page"
        // year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
       error: "Bad Request" 
    });
});

app.listen(port, () => {
    console.log(`server is up on ${port}`);
});

