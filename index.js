const https = require('https');
const fs = require('fs');
const uuidv4 = require("uuid").v4;

const generateRandomImage = async ({ name = null, path = null }) =>
  new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const imgSource = `https://www.thiswaifudoesnotexist.net/example-${randomNumber}.jpg`;

    const handleOptions = () => {
      if (name && path) {
        return `${path}/${name}.jpg`
      }
      else if (name && !path) {
        return `${name}.jpg`
      }
      else if (!name && path) {
        return `${path}/${randomNumber}_${uuidv4()}.jpg`
      }
      else {
        return `${randomNumber}_${uuidv4()}.jpg`
      }
    }

    return https.get(imgSource, (res) => {
      res.on("error", (e) => reject(e))
      res.pipe(fs.createWriteStream(handleOptions()));
      res.on("end", () => resolve(0))
    });
  });