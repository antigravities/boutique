const fs = require("fs").promises;
const path = require("path");

module.exports = async function walk(directory, callback){
  for( file of await fs.readdir(directory) ){
    let pth = path.join(directory, file).replace(/\\/g, "/");

    if( (await fs.lstat(pth)).isDirectory() ){
      await walk(pth, callback);
      continue;
    }

    await callback(pth);
  }
}