// base setup
// =============================

var user = require('./app/users/user');

// call the packages -----
var express       = require('express'),       //call express
    app           = express(),                //define our app using express
    bodyParser    = require('body-parser'),   //get body-parser
    morgan        = require('morgan'),        //used to see requests
    mongoose      = require('mongoose'),      //for working with the db
    port          = process.env.PORT || 8080, //set port for app
    apiRouter     = express.Router(); //get an instance of the express router

// connect to our database (hosted on modulus.io)
mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');

// app config -----
// use body parser so we can grab info from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configure our app to handle CORS requests
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));



// routes for our api
// =============================

//basic route for home page
app.get('/', function(req,res){
  res.send("welcome to the homepage");
});



// more routes for our api will happen here

  //middleware to use for all requests
  apiRouter.use(function(req,res,next){
    //do logging
    console.log('Somebody just came to our app!');

    //we'll add more to the middleware in chapter 10 ============================
    //this is where we will authenticate users


    next(); //make sure we go tot he next routes and don't stop here
  });

  //test route to make sure everything is working
  //(accessed at GET http://localhost:8080/api)
  apiRouter.get('/', function(req,res){
    res.json({message:"hooray! welcome to our api!"})
  });


// register our routes -----
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);



// start the server
// =============================
app.listen(port);
console.log("magic happens on port " + port);