'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false
      },
      log_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'logs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING(5000),
        allowNull: false,

      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
      },
      link: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },
      store: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
