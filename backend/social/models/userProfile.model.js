module.exports = (sequelize, Sequelize) => {
    const userProfile = sequelize.define("User_Profile", {
      user_id: {
        type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      social_links: {
        type: Sequelize.JSON
      },
      employee_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return userProfile;
  };