const https = require('https');
const fs = require('fs');
const uuidv4 = require("uuid").v4;

/**
 * @description
 * Write a random waifu image file on file system. Default to an uuid filename & root path (of parent process).
 * You can also pass an option Object with custom 'filename' and 'path' values.
 *
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.filename - Pass some string to chose an arbitrary filename
 * @param {string} options.path - Pass some path (relative to parent process). Ex: './__TESTS__/images'
 * @returns {Promise.<Error|0>}
 *    A promise that will either Resolve with base64 string representation of the image when file is successfully written, 
 *    and otherwise Reject Error object.
 * @example
 *     generateWaifu({path: "/images", filename:"megumin"})
 *       .then(res => console.log(res)) // data:image/png;base64,/9j/base64encodedblahblah
 *       .catch(err => console.error(err))
 */
const generateWaifu = async (options) =>
  new Promise((resolve, reject) => {
    const { filename = null, path = null } = { ...options }
    const randomNumber = Math.floor(Math.random() * 100000);
    const imgSource = `https://www.thiswaifudoesnotexist.net/example-${randomNumber}.jpg`;

    const handleOptions = () => {
      if (filename && path) {
        return `${path}/${filename}.png`
      }
      else if (filename && !path) {
        return `${filename}.png`
      }
      else if (!filename && path) {
        return `${path}/${randomNumber}_${uuidv4()}.png`
      }
      else {
        return `${randomNumber}_${uuidv4()}.png`
      }
    }

    return https.get(imgSource, async (res) => {
      const options = handleOptions();
      res.on("error", (e) => reject(e));
      res.pipe(fs.createWriteStream(options));
      res.on("end", async () => {
        const base64str = await fs.promises.readFile(`./${options}`, { encoding: "base64" })
        return resolve(`data:image/png;base64,${base64str}`)
      }
      );
    });
  })

module.exports = generateWaifu;