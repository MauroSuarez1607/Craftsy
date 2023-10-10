const {validationResult} = require('express-validator')
const { readJSON, writeJSON} = require('../../data')
const User = require('../../data/User')

module.exports = (req,res) => {

    let errors = validationResult(req)
    if(errors.isEmpty()) {

        const users = readJSON('users.json')

        let newUser = new User(req.body)

        users.push(newUser)

        writeJSON(users, 'users.json')

        return res.redirect('/')

    }else {
        return res.render('register', {
            old : req.body,
            errors : errors.mapped()
        })
    }
}