// routes for cats
var Cat = require('../models/cat')

// functions to generate random cat parameters
// starting code from: http://www.mediacollege.com/internet/javascript/number/random.html
function generateName() {
    var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = "";
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
        if (i==0) 
            randomstring += capitals.substring(rnum, rnum+1);
        else
		    randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function generateAge() {
    var age = Math.floor(Math.random() * 22);
    return age;
}

function generateColors() {
    var colors = ["red","orange","yellow","green","blue","indigo","violet"];
    var catcolors = [];
    var color = colors[Math.floor(Math.random()*7)];
    while (catcolors.indexOf(color) == -1) {
        catcolors.push(color);
        color = colors[Math.floor(Math.random()*7)];
    }
    return catcolors;
}

// creating a new cat
exports.create = function(req, res){
  var newcat = new Cat({ name:generateName(), age:generateAge(), colors:generateColors() });
   newcat.save(function (err) {
    if (err)
      return console.log("error we couldn't save your cat");
    // display new cat
    res.render('newcat', {cat: newcat, title: 'You Made a New Cat!'});
  });
};

// listing all the cats sorted by age
exports.list = function(req, res){
  // get the list of cats
  var allcats = Cat.find({}).sort({'age':-1}).exec(function (err, allcats) {
        if (err)
            return console.log("error", allcats);
        res.render('cats', {cats: allcats, title: 'All The Cats'});
    });
};
/*
// list of cats of certain color sorted by age
exports.colors = function(req, res){
  // get the list of users
  //var colorcats = Cat.find({"color".indexOf(req.params.color) != -1}, function (err, docs) {
    //var colorcats = Cat.find({"color".indexOf(req.params.color) != -1}.sort{'age':-1}).exec(function (err, colorcats) {
    //console.log(req.params.color);
    ////var colorcats = Cat.find({'color':{$in:[req.params.color]}}).exec(function (err, colorcats) {
    var coolcats = [];
    var colorcats = Cat.find({}).each(function (err, colorcats) {
    console.log(colorcats);
    //colorcats.each(function (err, cat) {
    if (err)
      return console.log("error", colorcats);
    // send it back
    //res.render('color', {color: req.params.color, colorcats: docs, title: 'Cats that are Your Color'});
    //var coolcats = [];
    if (cat.color.indexOf(req.params.color) != -1)
        coolcats.push(cat);
    //});
    console.log(colorcats);
    res.render('color', {color: req.params.color, colorcats: coolcats, title: 'Cats that are Your Color'});
  });
};*/

exports.colors = function(req, res){
    var colorcats = [];
    var cats = Cat.find({}).sort({'age':-1}).exec(function (err, cats) {
    //console.log(cats);
    cats.forEach(function (cat) {
        //console.log(cat.colors);
        //console.log(req.params.color);
        if (cat.colors.indexOf(req.params.color) != -1) {
            colorcats.push(cat);
            console.log(cat);
            //console.log('yay!');
        }
        });
        //console.log(colorcats)
        res.render('color', {color: req.params.color, colorcats: colorcats, title: 'Cats that are Your Color'});
});
};

// deletes oldest cat
exports.rmold = function(req, res){
    var oldest = Cat.find({}).sort({'age':-1}).exec(function (err, oldest) {
    //sort by age to find oldest age
    //var oldyears = oldest[0].age;
    //var oldest = Cat.findOne({'age':oldyears});
    //Cat.remove(oldest[0]);
    oldest[0].remove();
    //if (err)
    //  return console.log("error", colorcats);
    // remove oldest
    //Cat.remove({'name':oldest.name});
    res.render('old', {oldcat: oldest[0], title: 'You Killed a Cat'});
    //res.render('cats', {cats: oldest, title: 'All The Cats'});
  });
};
