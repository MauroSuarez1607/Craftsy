const moment = require('moment')
const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .isLength({
      min: 2,
    })
    .withMessage("Debe tener como minimo dos letras")
    .bail()
    .isAlpha("es-ES", {ignore: ' '})
    .withMessage("Solo se permiter caracteres alfabeticos"),
  check("surname")
    .isLength({
      min: 2,
    })
    .withMessage("Debe tener como minimo dos letras")
    .bail()
    .isAlpha("es-ES", {ignore: ' '})
    .withMessage("Solo se permiter caracteres alfabeticos"),
  body('birthday')
    .custom((value) => {
      const birthday = moment(value)
      const minDate = moment().subtract(100, 'years')

      if (birthday.isBefore(minDate)) {
        throw new Error('Eppaaa...tan viejo/a sos? Aguanta...')
      }
      return true
    })
    .custom((value) => {
      const birthday = moment(value)
      const currentDate = moment()

      if (birthday.isAfter(currentDate)) {
        throw new Error('Andaa...terminator')
      }
      return true
    })
];
