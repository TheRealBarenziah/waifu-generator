const https = require('https');
const fs = require('fs');

const mosaic = async ({ pathOpts, skipFs, withoutPrefix, weightInMbs, imgSource }) => {

	return https.get(imgSource, async (res) => {
		if (skipFs) {
			// no call to filesystem; disregard other options
			res.setEncoding("base64")
			let response = '';
			res.on("error", (e) => reject(e));
			res.on("data", (d) => response += d)
			if (!skipFs) {
				res.pipe(fs.createWriteStream(pathOpts));
			}
			res.on("end", () => resolve(`${withoutPrefix ? "" : "data:image/png;base64,"}${response}`))
		}

	})
}

module.exports = mosaic;