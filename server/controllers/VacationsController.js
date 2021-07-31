const con = require('../utils/databse')
const Vacations = require('../models/VacationsModel');
const Users = require('../models/UsersModel');
const Users_Vacations = require('../models/userVacationModale');

exports.getAllVacations = async (req, res) => {
    await Vacations.findAll().then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load getAllVacations" + JSON.stringify(err))
    })
}

exports.getfilterdVacations = async (req, res) => {
    await Vacations.findAll({attributes: ['id', 'destination','num_of_followers']}).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load getfilterdVacations" + JSON.stringify(err))
    })
}


exports.getVacationsByLikeOrder = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { userId: req.body.userId } }).then(liked_vacations => {
        Vacations.findAll().then(result => {
            let new_vacation = [...result]
            result.map((vacation ,index) =>{
                let found = liked_vacations.rows.find( (liked_vacation) => liked_vacation.dataValues.vacationId === vacation.dataValues.id)
                if(found){
                    //move to the front and change color of icon
                    console.log("liked vacation found : ",found)
                    console.log("vacationIndex:" ,index )
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


exports.getUsersLikedVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { userId: req.body.userId } }).then(liked_vacations => {
            res.send(liked_vacations.rows)
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
    let like_search = await Users_Vacations.findOne({ where: { userId: req.body.userId ,vacationId : req.body.vacationId} });

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


exports.calcLikedVacations = async (req, res) => {
    await Users_Vacations.findAndCountAll({ where: { vacationId: req.body.id } }).then(result => {
        let ob = {
            vacationId:req.body.id, 
            count: result.count,
        }
        Vacations.update({num_of_followers : ob.count}, { where:{ id: ob.vacationId } }).then(update => {
            res.send(update)
        })
        //res.send(ob);
    }).catch(err => {
        res.send("error load calcLikedVacations" + JSON.stringify(err))
    })
}

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
