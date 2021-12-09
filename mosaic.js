const generateWaifu = require("./index")
const mergeImages = require('merge-img');

const mosaic = async (number) => {
  const value = Number(number);
  if (typeof value !== "number") {
    throw Error("options.mosaic value must be number !")
  }
  if (value <= 0 || value > 999) {
    throw Error("options.mosaic value must be in the 1-999 range !")
  }

  const promQueens = [];

  for (let i = 0; i < number; i++) {
    promQueens.push(generateWaifu({ skipFs: true, withoutPrefix: true }))
  }

  Promise.all(promQueens)
    .then(b64Waifus => b64Waifus.map(b64Waifu => Buffer.from(b64Waifu, "base64")))
    .then(async b64Waifus => {
      await mergeImages(b64Waifus)
        .then(img => {
          img.write('tata.png', () => console.log('done'));
        })
        .catch(e => {
          console.log("error nani  ", e)
        })
    })
    .catch(e => {
      throw Error("Error in promise.all :", e)
    })
  console.log("number : ", number)
  return number;
}

module.exports = mosaic;