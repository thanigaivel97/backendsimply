const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailid = req.body.emailid;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    user.find({ emailid: emailid }).then(us => {
        if (us) {
            res.status(400).json({ message: "emailaldready exits try logging in" });
        } else {
            bcrypt.hash(password).then(haspwd => {
                const us = new user({
                    firstname: firstname,
                    lastname = lastname,
                    phonenumber: phonenumber,
                    emailid: emailid,
                    password: haspwd
                })
                return user.save()
            }).then(data => {
                res.status(200).json({ message: "succesfully created", userid: data.userId });
            }).catch(err => {
                res.status(400).json({ message: "user not crated" });
            })
        }
    })

}

exports.login = (req, res, next) => {
    const emailid = req.body.emailid;
    const password = req.body.password;
    let loadeduser;
    user.find({ emailid: emailid }).then(use => {
        if (!use) {
            res.status(400).json({ message: "user not found try sigining up" });
        }
        loadeduser = use;
        return use.password;
    }).then(pass => {
        return bcrypt.compare(pass, password)
    }).then(isequal => {
        if (!isequal) {
            res.status(400).json({ message: "not authenticated check user details" });

        }
        const token = jwt.sign({ emailid: loadeduser.emailid, userId: loadeduser.userId }, 'thanigaivel');

        res.status(200).json({ message: "authenticated", token: token, userid: loadeduser.userId.toString() });
    })
}