const con = require('../utils/databse')
const Vacations = require('../models/VacationsModel');
const Users = require('../models/UsersModel');
const Users_Vacations = require('../models/userVacationModale');
const io = require('../app.js')


// get all vacations
exports.getAllVacations = async (req, res) => {
    await Vacations.findAll().then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load getAllVacations" + JSON.stringify(err))
    })
}

//get only 'id', 'destination','num_of_followers' of all vacations
exports.getfilterdVacations = async (req, res) => {
    await Vacations.findAll({attributes: ['id', 'destination','num_of_followers']}).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load getfilterdVacations" + JSON.stringify(err))
    })
}

// get vacations by users likes first 
exports.getVacationsByLikeOrder = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { userId: req.body.userId } }).then(liked_vacations => {
        Vacations.findAll().then(result => {
            let new_vacation = [...result]
            //order the results
            result.map((vacation ,index) =>{
                let found = liked_vacations.rows.find( (liked_vacation) => liked_vacation.dataValues.vacationId === vacation.dataValues.id)
                if(found){
                    //move to the front and change color of icon
                    var tmp = new_vacation.splice(index, 1);
                    new_vacation.splice(0, 0, tmp[0]);
                }
            })
            res.send(new_vacation)
        }).catch(err => {
            res.send("error load getAllVacations" + JSON.stringify(err))
        })
    }).catch(err => {
        res.send("error load users liked vacation" + JSON.stringify(err))
    });
}

//get all the vacations that the user liked 
exports.getUsersLikedVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { userId: req.body.userId } }).then(liked_vacations => {
            res.send(liked_vacations.rows)
        }).catch(err => {
            res.send("error load getAllVacations" + JSON.stringify(err))
        })
}

// insert a new vacation
exports.insertVacation = async (req, res) => {
    await Vacations.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load inserted vacation" + JSON.stringify(err))
    });
}

//add or remove a vacation to/from the vacation_user list 
exports.likeVacation = async (req, res) => {
    let like_search = await Users_Vacations.findOne({ where: { userId: req.body.userId ,vacationId : req.body.vacationId} });
    //if the vacation exist delete here if not add 
    if(like_search){
        await Users_Vacations.destroy({where: {userId: req.body.userId , vacationId: req.body.vacationId}}).then(count => {
            if (!count) {
             return res.status(404).send({error: 'No user'});
            }
            res.status(204).send();
           });
    }
    else{
        await Users_Vacations.create(req.body).then(result => {
            res.send(result)
        }).catch(err => {
            res.send("error load liked vacation" + JSON.stringify(err))
        });
    }
}

//delete vacation
exports.deleteVacations = async (req, res) => {
    await Vacations.destroy({where: {id: req.body.id }}).then(result => {
        res.send(200)
    }).catch(err => {
        res.send("error load vacations")
    });
}

//update vacation
exports.editVacations = async (req, res) => {
    await Vacations.update(req.body, { where: { id: req.body.id } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load editVacations" + JSON.stringify(err))
    })
}

//calc spesific vacation likes and update the vacations table
exports.calcLikedVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { vacationId: req.body.id } }).then(result => {
        let ob = {
            vacationId:req.body.id, 
            count: result.count,
        }
        Vacations.update({num_of_followers : ob.count}, { where:{ id: ob.vacationId } }).then(update => {
            res.send(result)
        })
        //res.send(ob);
    }).catch(err => {
        res.send("error load calcLikedVacations" + JSON.stringify(err))
    })
}

//callc all the liked vacations and update the data base 
exports.calcAllLikedVacations = async (req, res) => {
    let vacations;
    await Vacations.findAll().then(result => {
        vacations = [...result]
        // res.send(vacations)
    }).catch(err => {
        res.send("error load getAllVacations" + JSON.stringify(err))
    })
    vacations.map(vacation =>{
        Users_Vacations.findAndCountAll({ where: { vacationId: vacation.dataValues.id } }).then(result => {
            let ob = {
                vacationId:vacation.dataValues.id, 
                count: result.count,
            }
            Vacations.update({num_of_followers : ob.count}, { where:{ id: ob.vacationId } }).then(update => {
                // res.send(update)
            }).catch(err => {
                res.send("error load getAllVacations" + JSON.stringify(err))
            })
        })
    })
    res.send("Updated!!")
}