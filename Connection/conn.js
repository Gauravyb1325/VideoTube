const mongoose = require("mongoose");

// videoTubeBackend

mongoose
  .connect('mongodb://localhost:27017/videoTubeBackend')
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });