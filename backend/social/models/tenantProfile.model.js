module.exports = (sequelize, Sequelize) => {
    const tenantProfile = sequelize.define("Tenant_Profile", {
      tenant_id: {
        type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      tenant_name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.JSON
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.INTEGER
      },
      zip_code: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      web_url: {
        type: Sequelize.STRING
      }
    });
  
    return tenantProfile;
  };