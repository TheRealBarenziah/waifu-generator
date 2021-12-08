const generateWaifu = require("./index")
const mergeImages = require('merge-img');

const x = async () => {
  const waifu1 = Buffer.from(await generateWaifu({ skipFs: true, withoutPrefix: true }), "base64")
  const waifu2 = Buffer.from(await generateWaifu({ skipFs: true, withoutPrefix: true }), "base64")

  const byteToMb = (number) => number * 9.537e-7

  console.log(`obtw waifu1 bytelen:${waifu1.byteLength} 
  (${byteToMb(waifu1.byteLength)}Mb)

  waifu2.bytelen:${waifu2.byteLength}
  (${byteToMb(waifu2.byteLength)}Mb)
  `)

  await mergeImages([waifu1, waifu2])
    .then(img => {
      img.write('tata.png', () => console.log('done'));
    })
    .catch(e => {
      console.log("error nani  ", e)
    })

}

x()