//load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

//send our index.html file to the user
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1337);
console.log('1337 is the magic port!');


//create routes for the admin section

//get an instance of the router
var adminRouter = express.Router();
//admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
  res.send('I am the dashboard');
})

//users page. the dashboard (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res){
  res.send('I show all the users');
})

//posts page. the dashboard (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res){
  res.send('I show all the posts');
})

//apply the routes to our application
app.use('/admin', adminRouter);