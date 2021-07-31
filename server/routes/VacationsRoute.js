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

module.exports = router;