const express = require('express');
const router = express.Router();

const Vacations = require('../controllers/VacationsController')


router.get('/getAllVacations', Vacations.getAllVacations)
router.post('/insertVacation', Vacations.insertVacation)

//http://www.localhost:5000/meetings/getAllVications
//http://www.localhost:5000/meetings/createMeeting


module.exports = router;