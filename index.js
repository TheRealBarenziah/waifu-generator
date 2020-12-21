const https = require('https');
const fs = require('fs');
const uuidv4 = require("uuid").v4;

/**
 * @description
 * Write a random waifu image file on file system. Default to an uuid filename & root path (of parent process).
 * You can also pass an option Object with custom 'name' and 'path' values.
 *
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.filename - Pass some string to chose an arbitrary filename
 * @param {string} options.path - Pass some path (relative to parent process). Ex: './__TESTS__/images'
 * @returns {Promise.<Error|0>}
 *    A promise that will either Resolve with 0 when file is successfully written, or Reject Error object otherwise.
 * @example
 *     generateWaifu({path: "/images", filename:"megumin"})
 *       .then(res => console.log(res)) // 0
 *       .catch(err => console.error(err))
 */
const generateWaifu = async ({ filename = null, path = null }) =>
  new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const imgSource = `https://www.thiswaifudoesnotexist.net/example-${randomNumber}.jpg`;

    const handleOptions = () => {
      if (filename && path) {
        return `${path}/${filename}.jpg`
      }
      else if (filename && !path) {
        return `${filename}.jpg`
      }
      else if (!filename && path) {
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

module.exports = generateWaifu;