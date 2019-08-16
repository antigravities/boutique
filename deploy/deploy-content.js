const fs = require("fs");

module.exports = async config => {
  console.log("Deploying site...");

  if( config.deploy ){
    if( config.deploy.split(":")[0] == "aws" && config.deploy.split(":").length > 3 ){ // aws:bucket:accessKeyId:secretAccessKey
      await require("./deploy-aws")(config);
    } else if( config.deploy.split(":")[0] == "github" && config.deploy.split(":").length > 2 ){
      await require("./deploy-github")(config);
    } else {
      console.log("Invalid deploy configuration.");
    }
  } else console.log("No deploy method defined.");
};