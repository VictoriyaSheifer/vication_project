const con = require('../utils/databse')
const Users = require('../models/UsersModel');


exports.CheckIfExist = async (req, res) => {
    await Users.findOne({ where: { email: req.body.email } }).then(result => {
        if(result)
            res.send(result)
        else res.send("no found")
    }).catch(err => {
        res.send(0)
    })
}

exports.CheckCredentials = async (req, res) => {
    await Users.findOne({ where: { email: req.body.email,password: req.body.password } }).then(result => {
        if(result)
            res.send(result)
        else res.send("no found")
    }).catch(err => {
        res.send(0)
    })
}


exports.insertUser = async (req, res) => {
    await Users.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error load manufacturer")
    });
}

exports.getAllUsers = async (req, res) => {
    await Users.findAll().then(result => {
        console.log(result);
        res.send(result)
    }).catch(err => {
        res.send("error load getAllUsers" + JSON.stringify(err))
    })
}
