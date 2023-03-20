const express = require('express');
const app = express()
const tenantUser = require ('./routes/user/index');
app.use('/tenantUser' ,tenantUser);
module.exports=app;