const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var Email =require('../models/Email');
var User =require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  req.user.password="protecsed"; 
  // var email=[]
  var user=[]
    Email.find( { $or:[ {'senderemail':req.user.email}, {'reseveremail':req.user.email}]}, function(error, emails) {
   
      // res.render('index', {
      //   user: req.user,
      //   emails
      // });
      emails.forEach(email => {  
        if(email.reseveremail != req.user.email){
           user.push({email:email.reseveremail})
        } 
      }); 

     
      getuserfromemail(user, function(userss){
        console.log("iuiuuij"+user);
      res.render('index', {
        user: req.user,
        emails,
        idemail:{},
        userss
      });
     });  
    });
     
    // console.log(req.user);
    // console.log(email);
  });
//   function getuserfromemail(arr) {
//     var user= User.find({ $or:arr}, function(error, users) {
//       console.log(users);
//     // console.log(users);
//     //  user=users
//     });  
//     // console.log(user)
//     return user;
//     // this |x| refers global |x|
// }
function getuserfromemail(arr, fn){
  User.find({ $or:arr}, function(error, users) {
    console.log(users); 
     fn(users); 
  });  
}



  router.get('/dashboard/:id', ensureAuthenticated, (req, res) =>{
    req.user.password="protecsed"; 
      var user=[]
     Email.find( { $or:[ {'senderemail':req.user.email}, {'reseveremail':req.user.email}]}, function(error, emails) {
      // console.log(emails);
      emails.forEach(email => {  
        if(email.reseveremail != req.user.email){
           user.push({email:email.reseveremail})
        } 
      }); 
      Email.findOne({_id:req.params.id}, function(error, idemail) {
      getuserfromemail(user, function(userss){
        console.log(userss); 
           res.render('index', {
            user: req.user,
            emails,
            idemail,
            userss
            });  
          });
      // this is where you get the return value
      });
      // getuserfromemail(user);
      // console.log(getuserfromemail(user)); 
      //  Email.findOne({_id:req.params.id}, function(error, idemail) {
      //   // console.log(idemail);
      //   User.find({ $or:[ {'email':req.user.email}, {'email':req.user.email}]}, function(error, users) {
      //     console.log(users);   
      //     res.render('index', {
      //       user: req.user,
      //       emails,
      //       idemail,
      //       users
      //       });   
      //   })

      //  });

      });
       
      // console.log(req.user);
      // console.log(email);
  });


  router.get('/downlode/:filename', ensureAuthenticated, (req, res) =>{  

    const file ="fileuplode/"+req.params.filename;
    res.download(file); // Set disposition and send it.

  });  

  // http://localhost:3000//downlode/1609896606765-5a2069f0.jpg
module.exports = router;
