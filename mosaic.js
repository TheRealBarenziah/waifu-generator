const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

const mosaic = (number) => {
  const value = Number(number);
  if (typeof value !== "number") {
    throw Error("options.mosaic value must be number !")
  }
  if (value <= 0 || value > 999) {
    throw Error("options.mosaic value must be in the 1-999 range !")
  }
  console.log("number : ", number)
  return number;
}

module.exports = mosaic;