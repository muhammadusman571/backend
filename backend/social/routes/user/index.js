const express = require('express')
const tenantProfile = require("../../controllers/tenantProfile.controller");
const app = express()
app.post("/",  tenantProfile.create);
app.get("/",  tenantProfile.findAll);
app.patch("/:id",  tenantProfile.update);
app.delete("/:id",  tenantProfile.delete);
app.get("/:id",  tenantProfile.findOne);
module.exports = app;
