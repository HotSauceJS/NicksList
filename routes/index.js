var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
    title: String,
    user: String,
    description: String,
    category: String
});

var Listing = mongoose.model('Listing', listingSchema);

exports.index = function(req, res){
    Listing.find().distinct('category', function(err, categories) {
        res.render('index', { title: 'Nicks List', categories: categories });
    });
};

exports.category = function(req, res){
    var category = req.params.category;
    Listing.find({ category: category }, function(err, listings) {
        res.render('category', { title: category, listings: listings });
    });
};

exports.addListing = function(req, res){
    var post = 
        {title: req.body.title,
         user: req.body.user,
         description: req.body.description,
         category: req.body.category
        };
    var newListing = new Listing(post);
    newListing.save(function(err) {
        if (err) console.log(err);
        res.send ("listing added");
    });
};

exports.listing = function(req, res){
    res.render('listing', {title: "New Listing"});
};
