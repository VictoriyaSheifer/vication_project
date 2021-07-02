const express = require('express');
const router = express.Router();

const Vacations = require('../controllers/VacationsController')


router.get('/getAllVacations', Vacations.getAllVacations)
router.post('/insertVacation', Vacations.insertVacation)
router.post('/likeVacation', Vacations.likeVacation)
router.post('/unlikeVacation', Vacations.unlikeVacation)
router.post('/getnumberOfLikedVications', Vacations.getnumberOfLikedVications)
router.post('/getUsersLikesVacations', Vacations.getUsersLikesVacations)
//http://www.localhost:5000/vacations/getAllVacations
//http://www.localhost:5000/vacations/insertVacation
//http://www.localhost:5000/vacations/likeVacation
//http://www.localhost:5000/vacations/getnumberOfLikedVications
module.exports = router;