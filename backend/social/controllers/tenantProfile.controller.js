const db = require("../models");
const tenantProfile = db.Tenant_Porfile;
const userProfile = db.User_Profile;
const Op = db.Sequelize.Op;

// Create and Save a new Tenant Porfile Date
exports.create = async(req, res) => {
    const tenantProfileData=req.body;

    await tenantProfile.create({
          tenant_name: tenantProfileData.tenant_name,
          address: tenantProfileData.address,
          city: tenantProfileData.city,
          state: tenantProfileData.state,
          country: tenantProfileData.country,
          zip_code: tenantProfileData.zip_code,
          web_url: tenantProfileData.web_url
    })
        .then((tenantData) => {
            if(tenantProfileData.User_Profile)
            {
                for(let data of tenantProfileData.User_Profile){
                  userProfile.create( {
                  first_name: data.first_name,
                  last_name: data.last_name,
                  department: data.department,
                  designation: data.designation,
                  image_url: data.image_url,
                  city: data.city,
                  country: data.country,
                  bio: data.bio,
                  social_links:data.social_links,
                  employee_id: data.employee_id,
                  TenantProfileTenantId: tenantData.tenant_id
            

                 })
              .then((userData) => {})
              .catch((err) => {
                  console.log(err);
              });
            }
        }
        responseObject = {
            status: true,
            message: "Create successfully.",
            data: tenantProfileData
          };
          res.json(responseObject);

        })
        .catch((err) => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Tenant Porfile Date."
              });
        });
   
};

// Retrieve all Tenant Profile from the database.
exports.findAll = (req, res) => {
  tenantProfile.findAll({ include: ["User_Profile"]  })
    .then(data => {
      res.json({
        status: true,
        message: "Result found",
        data: data,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tenant Profile."
      });
    });
};

// Find a single Tenant Profile with an id
exports.findOne = async(req, res) => {
 const id = req.params.id;
 await tenantProfile.findByPk(id, { include: ["User_Profile"] })
    .then((data) => {
      if(data)
      {
        res.json({
          status: true,
          message: "Result found",
          data: data,
        });

      }
      else{
      res.status(404).send({
        message: `Cannot find Tenant Profile with id=${id}.`
      });
    }
        
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tenant Profile."
      });
    });


    
    
  
};

// Update a Tenant Profile by the id in the request
exports.update = async(req, res) => {
  const id = req.params.id;
  const tenantProfileData=req.body;



  await tenantProfile.update(
    {tenant_name: tenantProfileData.tenant_name,
    address: tenantProfileData.address,
    city: tenantProfileData.city,
    state: tenantProfileData.state,
    country: tenantProfileData.country,
    zip_code: tenantProfileData.zip_code,
    pone: tenantProfileData.pone,
    web_url: tenantProfileData.web_url},
  
  {
    where: { tenant_id: id }
  }).then(num => {
    if(tenantProfileData.User_Profile)
    {
     userProfile.update(
      {
      first_name: tenantProfileData.User_Profile.first_name,
      last_name: tenantProfileData.User_Profile.last_name,
      department: tenantProfileData.User_Profile.department,
      designation: tenantProfileData.User_Profile.designation,
      image_url: tenantProfileData.User_Profile.image_url,
      city: tenantProfileData.User_Profile.city,
      country: tenantProfileData.User_Profile.country,
      bio: tenantProfileData.User_Profile.bio,
      social_links:tenantProfileData.User_Profile.social_links,
      employee_id: tenantProfileData.User_Profile.employee_id,
    },
  
    
    {
      where: { TenantProfileTenantId: id }
    }).then(num => {
      
  
    })
    .catch(err => {
      console.log(err);
    });
  }
  if (num == 1) {
    res.send({
      message: "Tenant Profile was update successfully!"
    });
  } else {
    res.status(500).send({
      message: `Could not upadte Tenant Profile with id=${id}`
    });
  }

  })
  .catch(err => {
    res.status(500).send({
      message: `Could not update Tenant Profile with id=${id}`
    });
  });
  
};

// Delete a Tenant Profile with the specified id in the request
exports.delete = async(req, res) => {

  const id = req.params.id;

  await tenantProfile.destroy({
    where: { tenant_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tenant Profile was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tenant Profile with id=${id}. Maybe Tenant Profile was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tenant Profile with id=" + id
      });
    });
  
};


