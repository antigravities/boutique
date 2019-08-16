const aws = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const walk = require("./walk");

module.exports = async config => {
  let [ _, bucket, accessKeyId, secretAccessKey ] = config.deploy.split(":");

  const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey
  });

  try {
    await walk("build", async file => {
      await s3.putObject({
        Bucket: bucket,
        Key: file.split("build/")[1],
        Body: fs.readFileSync(file)
      }).promise();
    })
  } catch(e){
    console.log(e);
  }

  console.log("AWS deploy finished.");
}