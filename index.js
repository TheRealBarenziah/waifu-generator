const https = require('https');
const fs = require('fs');
const uuidv4 = require("uuid").v4;

/**
 * @description
 * Write a random waifu image file on file system. Default to an uuid filename & root path (of parent process).
 * You can also pass an option Object with custom 'filename' and 'path' values.
 *
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.filename - Pass some string to chose an arbitrary filename Ex: megumin
 * @param {string} options.path - Pass some path (relative to parent process). Ex: './__TESTS__/images'
 * @param {boolean} option.skipFs - Disable fs call; useful for working with RAM only. Care as it's making the other options irrelevant !
 * @returns {Promise.<Error|0>}
 *    A promise that will either Resolve with base64 string representation of the image when file is successfully written, 
 *    and otherwise Reject Error object.
 * @example
 *     generateWaifu({path: "/images", filename:"megumin"})
 *       .then(res => console.log(res)) // data:image/png;base64,/9j/base64encodedblahblahblah
 *       .catch(err => console.error(err))
 */

const generateWaifu = async (options) =>
  new Promise((resolve, reject) => {
    const { filename = null, path = null, skipFs = false } = { ...options };
    const randomNumber = Math.floor(Math.random() * 100000);
    const imgSource = `https://www.thiswaifudoesnotexist.net/example-${randomNumber}.jpg`;

    return https.get(imgSource, async (res) => {
      if (skipFs) {
        // no call to filesystem; disregard other options
        res.setEncoding("base64")
        let response = '';
        res.on("error", (e) => reject(e));
        res.on("data", (d) => response += d)
        res.on("end", () => resolve(`data:image/png;base64,${response}`))
      }

      else {
        // standard behaviour using fs; need to handle options

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
        };

        const options = handleOptions();
        res.on("error", (e) => reject(e));
        res.pipe(fs.createWriteStream(options));
        res.on("end", async () => {
          const base64str = await fs.promises.readFile(`./${options}`, { encoding: "base64" })
          return resolve(`data:image/png;base64,${base64str}`)
        }
        );
      };
    });
  });

module.exports = generateWaifu;