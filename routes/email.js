const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var Email =require('../models/Email');



// .....................for uplode  image
const multer = require('multer'); 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //  // Allowed ext
    // const filetypes = /jpeg|jpg|png|gif/; 
    // // Check ext
    // const extname =  filetypes.test(file.originalname.split('.').pop());
    // // Check mime
    // const mimetype = filetypes.test(file.mimetype); 
    // if(mimetype && extname){
      cb(null, "fileuplode")
    // } else {
    //   cb('Error: Images Only!');
    // }
    // // cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.substring(0,8)+"."+file.originalname.split('.').pop())
  },
});

const uploadStorage = multer({ storage: storage })
// ==========================================================================
// create new email 
//http://localhost:3000/email/addEmail
router.post('/addEmail', uploadStorage.single("file"), ensureAuthenticated, (req, res) => {
  // res.send(req.body)
    var newEmail=new Email({senderemail:req.user.email,reseveremail:req.body.reseveremail,titel:req.body.titel,content:req.body.content,file:req.file.filename});
    newEmail.save(function(error, document){
      if (error) {
        throw err;
      }
      res.redirect("/");
        });
    // res.send("vfvfdvd") 
  });
  // _id: 5ff14892411cda314c75b7d7,
  // name: 'Mustafa',
  // email: 'admin@gmail.com',
  // password: '$2a$10$T.bBNdkGSKsBUJz87nxePe83u2n0ZLLamF47TCgUOroraaqrKoJMa',
  // date: 2021-01-03T04:31:14.979Z,
  // __v: 0
  
// ==========================================================================

// select one email 
//http://localhost:3000/email/getEmailById/id
  router.get('/getEmailById/:id', ensureAuthenticated, (req, res) => { 
    Email.findOne({_id:req.params.id}, function(error, email) {
      res.send(email)
  
    })
    // res.send("vfvfdvd") 
  });
  

  
// ==========================================================================

// select all emails   
//http://localhost:3000/email/getEmails
  router.get('/getEmails', ensureAuthenticated, (req, res) => { 
    Email.find({}, function(error, email) {
      res.send(email)
  
    })
  });
    
// ==========================================================================

// delete  email  by id
//http://localhost:3000/email/deleteEmail/id
  router.get('/deleteEmail/:id', ensureAuthenticated, (req, res) => {  
    Email.findOne({_id:req.params.id}, function(error, email) {
      try {
        email.remove(function(error){
          if (error) {
            throw error; 
          }      
        });
      } 
      catch(e) {
        console.log(e);
        res.redirect("/");
 
      }
  
    });
       res.send("deleted")
  });
  
   

// ==========================================================================

// update email 
//http://localhost:3000/email/updateEmailById/id
  router.get('/updateEmailById/:id', ensureAuthenticated, (req, res) => {  
    Email.findOne({_id:req.params.id}, function(error, email) {
      try {
        email.set({senderemail:"updated",reseveremail:"updated"});
        email.save(function(error, document){
          res.send(document);
         }); 
      } 
      catch(e) {
        console.log(e); 
        res.redirect("/");
      }
  
    });
  });
   

module.exports = router;
 