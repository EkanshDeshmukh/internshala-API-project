const express = require('express');
const { homepage, currentUser ,studentsignup,  studentsignin, studentsignout} = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

//GET /
router.get('/', isAuthenticated, homepage);

router.post('/student', isAuthenticated, currentUser);


//POST
 router.post('/student/signup', studentsignup);

 router.post('/student/signin', studentsignin);

 router.get('/student/signout', isAuthenticated,studentsignout);

 

 

module.exports = router