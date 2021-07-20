const con = require('../utils/databse')
const Vacations = require('../models/VacationsModel');
const Users = require('../models/UsersModel');
const Users_Vacations = require('../models/userVacationModale');

exports.getAllVacations = async (req, res) => {
    await Vacations.findAll().then(result => {
        console.log(result);
        res.send(result)
    }).catch(err => {
        res.send("error load getAllVacations" + JSON.stringify(err))
    })
}

//INSERT
exports.insertVacation = async (req, res) => {
    await Vacations.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load inserted vacation" + JSON.stringify(err))
    });
}

exports.likeVacation = async (req, res) => {
    await Users_Vacations.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load liked vacation" + JSON.stringify(err))
    });
}

exports.getUsersLikesVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { userId: req.body.userId } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load users liked vacation" + JSON.stringify(err))
    });
}

exports.unlikeVacation = async (req, res) => {
    await Users_Vacations.destroy({where: {userId: req.body.userId , vacationId: req.body.vacationId}}).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load liked vacation" + JSON.stringify(err))
    });
}

//DELETE
exports.deleteVacations = async (req, res) => {
    await Vacations.destroy({where: {id: req.body.id }}).then(result => {
        res.send(200)
    }).catch(err => {
        res.send("error load vacations")
    });
}

// //update 
exports.editVacations = async (req, res) => {
    await Vacations.update(req.body, { where: { id: req.body.id } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load editVacations" + JSON.stringify(err))
    })
}

// await User.update({ lastName: "Doe" }, {
//     where: {
//       id: 3
//     }

exports.updateNumOfLikes = async (req, res) => {
    await Vacations.update({num_of_followers : req.body.count}, { where:{ id: req.body.vacationId } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load udate num following Vacations" + JSON.stringify(err))
    })
}

exports.calcLikedVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { vacationId: req.body.vacationId } }).then(result => {
        let ob = {
            vacationId:req.body.vacationId, 
            count: result.count,
        }
        res.send(ob);
    }).catch(err => {
        res.send("error load editVacations" + JSON.stringify(err))
    })
    updateNumOfLikes(ob)
}

// //GET + Join 
// exports.getAllMeetings = async (req, res) => {
//     await Vications.findAll({
//         include: [Users]
//     }).then(result => {
//         console.log(result);
//         res.send(result)
//     }).catch(err => {
//         res.send("error load getAllProducts" + JSON.stringify(err))
//     })
// }

// exports.getMeetingById = async (req, res) => {
//     if(req.query.id == 0){
//         await Vications.findAll({include: [Users]}).then(result => {
//             console.log(result);
//             res.send(result)
//         }).catch(err => {
//             res.send("error load getAllProducts" + JSON.stringify(err))
//         })}
//     else{
//         await Vications.findAll({ include:[Users] , where: { devTeamId: req.query.id } }).then(result => {
//             console.log(result);
//             res.send(result)
//         }).catch(err => {
//             res.send("error load getAllProducts" + JSON.stringify(err))
//         })
//     }
// }

// //INSERT
// exports.createMeeting = async (req, res) => {
// // (`id`, `dev_team_Id`, `meeting_description`, `room`, `start_date`, `end_date`
//     await Vications.create(req.body).then(result => {
//         res.send(result)
//     }).catch(err => {
//         res.send("error load meeting" + JSON.stringify(err))
//     });
// }

// //UPDATE
// exports.UpdateQuantOfProduct = async (req, res, next) => {
//     // {
//     //     "id": ,
//     //     "quantity": ""
//     // }
//     await Meetings.update({ qnt: req.body.quantity }, {where: {id: req.body.id }}).then(product => {
//                 res.send(product)
//         }).catch(err => {
//             res.send("error load Activities :" + err)
//         })
//     }


// //DELETE
// exports.deleteMeetings = async (req, res) => {
//     await Meetings.destroy({where: {id: req.body.id }}).then(product => {
//         res.send(200)
//     }).catch(err => {
//         res.send("error load users")
//     });
// }

// //GET + Join + order ftom by quant 
// exports.getAllMeetings = async (req, res) => {
//     await Meetings.findAll({
//         include: [Manufacture], order: [
//             ['qnt', 'DESC'],
//         ]
//     }).then(result => {
//         console.log(result);
//         res.send(result)
//     }).catch(err => {
//         res.send("error load getAllMeetings" + JSON.stringify(err))
//     })
// }

// //update 
// exports.createProduct = async (req, res) => {
//     await Meetings.update(req.body, { where: { id: req.body.id } }).then(result => {
//         res.send(result)
//     }).catch(err => {
//         res.send("error load createProduct" + JSON.stringify(err))
//     })
// }
