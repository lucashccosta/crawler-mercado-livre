const databaseConfig = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "crawler_ml_sequelize",
    define: {
        timestamps: true,
        underscored: true
    }
};

module.exports = databaseConfig;