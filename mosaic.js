const mergeImages = require('merge-img-vwv');
const Jimp = require('jimp');
const httpsGet = require('./httpsGet');
const { randomizeImgUrl, randomizeHost } = require('./randomizeImgUrl');
const promisify = require("util").promisify;

const mosaic = async ({ pathOpts, skipFs, withoutPrefix, number, mergeImgOpts = {
	direction: false,
} }) => {
	const opts = {
		...mergeImgOpts,
	}
	const value = parseInt(number, 10);
	if (typeof value !== "number") {
		throw Error("options.mosaic.number value must be number !")
	}
	if (value <= 0 || value > 99) {
		throw Error("options.mosaic.number value must be in the 1-99 range !")
	}

	// Host must be consistent to have a pretty mosaic
	const hostname = randomizeHost()

	const promQueens = [];

	for (let i = 0; i < number; i++) {
		promQueens.push(
			httpsGet({
				imgSource: randomizeImgUrl(hostname),
				skipFs: true,
				withoutPrefix: true,
			})
		)
	}

	return Promise.all(promQueens)
		.then(b64Waifus => b64Waifus.map(b64Waifu => Buffer.from(b64Waifu, "base64")))
		.then(async b64Waifus => await mergeImages(b64Waifus, { ...opts })
			.then(async img => {
				if (!skipFs) {
					await img.write(pathOpts)
				}
				// asyncGetBuffer: https://github.com/oliver-moran/jimp/issues/90#issuecomment-408650356
				const getBufferAsync = promisify(img.getBuffer.bind(img));
				const output = await getBufferAsync(Jimp.MIME_PNG)
					.then(buffer => buffer.toString("base64"))
				return withoutPrefix ? output : `data:image/png;base64,${output}`;
			})
			.catch(e => {
				throw new Error("Error writing file:\n", e)
			})
		)
		.catch(e => {
			throw Error(e)
		})
}

module.exports = mosaic;