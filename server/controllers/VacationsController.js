const con = require('../utils/databse')
const Vacations = require('../models/VacationsModel');
const Users = require('../models/UsersModel');


exports.getAllVacations = async (req, res) => {
    await Vacations.findAll().then(result => {
        console.log(result);
        res.send(result)
    }).catch(err => {
        res.send("error load getAllProducts" + JSON.stringify(err))
    })
}

//INSERT
exports.insertVacation = async (req, res) => {
        // {
        // "destination":"",
        //  "description":"",
        //  "start_date":"",
        //  "end_date":"",
        //  "price":"",
        // }
    await Vacations.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load meeting" + JSON.stringify(err))
    });
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
