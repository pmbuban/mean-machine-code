// Basic routing
// ------------------------------------

// load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

//send our index.html file to the user
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1337);
console.log('1337 is the magic port!');

// get an instance of the router
var adminRouter = express.Router();

// Router middleware
// ------------------------------------
// order of middleware is very important. this needs to happen BEFORE the route requests
// route middleware that will happen on every request
adminRouter.use(function(req, res, next){
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});


// Route middleware for Parameters (.param())
// ------------------------------------
// route middleware to validate :name
adminRouter.param('name', function(req, res, next, name){
  // do validation on name here
  // blah blah validation
  // log something so we know it's working
  console.log('doing name validations on ' + name);

  // once validation is done, save the new item in the req
  req.name = name;
  //go to next thing
  next()
})

// Routes with Parameters (/hello/:name)
// ------------------------------------
// route with parameters (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res) {
  console.log('user: ' + req.name + ' has been validated')
  res.send('hello ' + req.name + '!');
  // if you don't use middleware to add name to req, you can access the name var via req.params.name
  // ** we can use this information to grab all user data attributed to the user
});

// Login Routes (app.route())
app.route('/login')
  //show the form (GET http://localhost:1337/login)
  .get(function(req,res){
    res.send('this is the login form');
  })
  //process the form (POST http://localhost:1337/login)
  .post(function(req,res){
    console.log('processing');
    res.send('processing the login form!')
  });

// Create routes for the admin section
// ------------------------------------
// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
  res.send('I am the dashboard');
})

// users page. the dashboard (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res){
  res.send('I show all the users');
})

// posts page. the dashboard (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res){
  res.send('I show all the posts');
})


// apply the routes to our application
app.use('/admin', adminRouter);