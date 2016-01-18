var express = require ('express');
var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books =[
    {
        title: 'War and piece',
        genre: 'Historical fiction',
        author:'Lev Tolstoy',
        read: false
    },
      {
        title: 'Les Miserables',
        genre: 'Historical fiction',
        author:'Victor Hugo',
        read: true
    },
      {
        title: 'Morometii',
        genre: 'Fiction',
        author:'Marin Preda',
        read: true
    },
      {
        title: 'Misterele Berlinului',
        genre: 'Fiction',
        author:'Joseph Kanon',
        read: false
    },
      {
        title: 'Sub aceeasi stea',
        genre: 'Young adult',
        author:'John Green',
        read: false
    }
];


var router = function(nav){

    adminRouter.route('/addBooks')
        .get(function(req,res){
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection=db.collection('books');
                collection.insertMany(books,
                    function(err, results){
                        res.send(results);
                        db.close();
                });
                
                
            });
           //  res.send('inserting books');
            
        });
    
    
    
    return adminRouter;

};
module.exports = router;