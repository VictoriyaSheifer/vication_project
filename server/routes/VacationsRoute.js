const express = require('express');
const router = express.Router();

const Vacations = require('../controllers/VacationsController')


router.get('/getAllVacations', Vacations.getAllVacations)
router.get('/getfilterdVacations', Vacations.getfilterdVacations)
router.post('/insertVacation', Vacations.insertVacation)
router.post('/likeVacation', Vacations.likeVacation)
router.post('/getVacationsByLikeOrder', Vacations.getVacationsByLikeOrder)
router.post('/deleteVacations', Vacations.deleteVacations)
router.post('/editVacations', Vacations.editVacations)
router.post('/calcLikedVacations', Vacations.calcLikedVacations)
router.post('/calcAllLikedVacations', Vacations.calcAllLikedVacations)
router.post('/getUsersLikedVacations', Vacations.getUsersLikedVacations)
//http://www.localhost:5000/vacations/getAllVacations
//http://www.localhost:5000/vacations/insertVacation
//http://www.localhost:5000/vacations/likeVacation
//http://www.localhost:5000/vacations/getnumberOfLikedVications

module.exports = router;