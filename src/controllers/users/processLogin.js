const {validationResult} = require('express-validator')
const db = require('../../database/models')

module.exports = (req,res) => {

    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        const {email, remember} = req.body

        db.User.findOne({
            where : {
                email
            }
        })
            .then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.roleId
                }
        
                remember !== undefined && res.cookie('craftsyForEver20',req.session.userLogin, {
                    maxAge : 1000 * 60
                })

                /* carrito */

                db.Order.findOne({
                    where : {
                        userId : user.id,
                        statusId : 1
                    },
                    include : [
                        {
                            association : 'products',
                            include : ['brand', 'section', 'images']
                        }
                    ]
                }).then(order => {
                    if(order){
                        console.log(order);
                    }else {
                        db.Order.create({
                            total : 0,
                            userId : user.id,
                            statusId : 1
                        })
                    }
                })
        
                return res.redirect('/')
            })
            .catch(error => console.log(error))        
    }else {
        return res.render('login', {
            errors : errors.mapped()
        })
    }
}