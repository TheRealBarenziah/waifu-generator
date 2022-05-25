const httpsGet = require('./httpsGet');
const sharp = require("sharp");
const { writeFile } = require("fs").promises

const macrophilia = ({ pathOpts, skipFs, withoutPrefix, height, mustBeThiqq, imgSource }) =>
	new Promise(async (resolve, reject) => {
		const image = await httpsGet({
			imgSource,
			withoutPrefix: true,
			skipFs: true,
		})
			.catch(e => reject(e))

		const buf = Buffer.from(image, "base64")
		return await sharp(buf)
			.resize({
				height,
			})
			.png(mustBeThiqq ?
				{
					quality: 100,
					compressionLevel: 0,
					effort: 1
				}
				:
				{}
			)
			.toBuffer()
			.then(res => {
				if (!skipFs) {
					writeFile(pathOpts, res, "base64");
				}
				const b64Waifu = res.toString("base64");
				resolve(withoutPrefix ? b64Waifu : `data:image/png;base64,${b64Waifu}`);
			})
			.catch(e => reject(e))
	})


module.exports = macrophilia;