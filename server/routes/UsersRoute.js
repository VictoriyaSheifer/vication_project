const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController')

router.post('/insertUser', UserController.insertUser);
router.post('/CheckIfExist', UserController.CheckIfExist);
router.post('/CheckCredentials', UserController.CheckCredentials);
router.get('/getAllUsers', UserController.getAllUsers);

// router.get('/getAllDevTeams', UserController.getAllDevTeams)

module.exports = router;


//http://www.localhost:5000/development_team/insertDevTeams
//http://www.localhost:5000/development_team/getAllDevTeams
