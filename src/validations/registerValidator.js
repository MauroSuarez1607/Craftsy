const { check, body } = require("express-validator");
const { readJSON } = require("../data");

module.exports = [
  check("name")
    .isLength({
      min: 2,
    }).withMessage("Debe tener como minimo dos letras").bail()
    .isAlpha('es-ES').withMessage("Solo se permiter caracteres alfabeticos"),
  check("surname")
    .isLength({
      min: 2,
    }).withMessage("Debe tener como minimo dos letras").bail()
    .isAlpha().withMessage("Solo se permiter caracteres alfabeticos"),
  check("email")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage('Email no valido').bail()
    .custom((value) => {
      const users = readJSON('users.json')
      const user = users.find(user => user.email === value)
      if(user) {
        return false
      }
      return true
    }).withMessage('El email ya se encuentra registrado'),
  check('password')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('Debe tener entre 6 y 12 caracteres'),
  body('password2')
    .custom((value, {req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden')
];
