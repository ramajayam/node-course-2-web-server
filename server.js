const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3005;
// const port =  3005;

var app = express();


hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (inputMsg)=>{
    return inputMsg.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var data = `${req.method}, ${req.url}`;
    fs.appendFile('server.log', now + "; " + data + "\n", (err) => {
        if (err) throw err;
        console.log('data added to the file.');
    });
    next();
});

// app.use('/', (req, res, next) => {    
//     if (req.url === "/about" || req.url === "/home") {
//         next();
//     } else {
//         res.render('maintenance.hbs', {
//             pageTitle: "Maintenance Page",
//             welcomeMessage: "Site is being updated"
//         });
//     }
// }); 

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res)=>{    
    res.render('home.hbs', {
        pageTitle: "Home Page",        
        welcomeMessage: "Welcome to my new website"
    });
    console.log('home page');
});

app.get('/about', (req, res) => {    
    res.render('about.hbs', {
        pageTitle: "HandleBar Dynamic Page"        
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
