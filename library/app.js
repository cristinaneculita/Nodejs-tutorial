var express = require('express');

var app = express();

var sql = require('mssql');
var config={
    user:'sa',
    password:'Smart000',
    server: 'localhost\\SQLEXPRESS',
    database:'Books'
};

sql.connect(config, function(err){
   if(err)
    {console.log(err);}
    
});

var port = process.env.port ||5000;
var nav = [{Link:'/Books',Text: 'Book'}, {Link:'/Authors', Text:'Author'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);


app.use(express.static('public'));
app.set('views', './src/views');

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname:'.hbs'}));

app.set('view engine', 'ejs');


app.use('/Books', bookRouter);

app.get('/', function(req, res){
   res.render('index', {title: 'Hello from render',nav: nav}); 
});



app.listen(port, function(err){
    console.log('running server on port: '+port);
});