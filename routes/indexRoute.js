const express = require('express');
const { homepage, studentsignup,  studentsignin, studentsignout} = require('../controllers/indexController');
const router = express.Router();

//GET /
router.get('/', homepage);

//POST
 router.post('/student/signup', studentsignup);

 router.post('/student/signin', studentsignin);

 router.post('/student/signout', studentsignout);

 

 

module.exports = router