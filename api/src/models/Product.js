const { Model, DataTypes } = require('sequelize');

class Product extends Model {

    /**
     * Inicia o model sequelize
     * @param connection Sequelize connection
     */
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            link: DataTypes.STRING,
            store: DataTypes.STRING,
            state: DataTypes.STRING
        }, {
            sequelize: connection
        });
    }

    /**
     * Cria relacionamentos 
     * @param models App models
     */
    static associate(models) {
        this.belongsTo(models.Log, { //qual model será o relacionamento
            foreignKey: 'log_id', //coluna que se relaciona com a tabela logs
            as: 'log' //alias do relacionamento
        });
    }
}

module.exports = Product;