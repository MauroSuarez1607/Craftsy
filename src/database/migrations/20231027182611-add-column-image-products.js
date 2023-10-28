module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Products',
      'image',
      Sequelize.STRING
    )
  },

  down: function(queryInterface, Sequelize){
    return queryInterface.removeColumn(
      'Products',
      'image'
    )
  }
}