const dbConfig = require("../database/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Tenant_Porfile = require("./tenantProfile.model")(sequelize, Sequelize);
db.User_Profile = require("./userProfile.model.js")(sequelize, Sequelize);

db.Tenant_Porfile.hasMany(db.User_Profile, { as: "User_Profile" });
db.User_Profile.belongsTo(db.Tenant_Porfile, {
  foreignKey: "tanent_id",
  as: "User_Profile",
  
});

module.exports = db;