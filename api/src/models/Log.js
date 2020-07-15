const { Model, DataTypes } = require('sequelize');

class Log extends Model {

    static init(connection) {
        super.init({
            search: DataTypes.STRING,
            total_results: DataTypes.INTEGER,
            total_searched: DataTypes.INTEGER,
            status: {
                type: DataTypes.ENUM,
                values: ['processing', 'finished', 'error']
            }
        }, {
            sequelize: connection
        });
    }

    /**
     * Cria relacionamentos 
     * @param models App models
     */
    static associate(models) {
        this.hasMany(models.Product, { //qual model será o relacionamento
            foreignKey: 'log_id', //coluna que se relaciona com a tabela products
            as: 'products' //alias do relacionamento
        });
    }
}

module.exports = Log;