const https = require('https');
const fs = require("fs");

/**
 * @param {Object} options
 * @param {string} options.imgSource 
 * @param {string} options.pathOpts 
 * @param {boolean} options.withoutPrefix 
 * @param {boolean} options.skipFs 
 * @returns {Promise<string>} base64 data
 */
module.exports = ({
	imgSource,
	pathOpts,
	withoutPrefix,
	skipFs }) => new Promise((resolve, reject) => {
		const req = https.request({
			method: "GET",
			hostname: imgSource.hostname,
			path: imgSource.path,
			rejectUnauthorized: false,
			headers: {
				Connection: "keep-alive",
				Accept: "*/*",
			}
		}, (res) => {
			res.setEncoding("base64")
			let response = '';
			res.on("error", (e) => reject(e));
			res.on("data", (d) => response += d)
			if (!skipFs) {
				res.pipe(
					fs.createWriteStream(
						pathOpts, "base64"
					)
				);
			}
			res.on("end", () =>
				resolve(`${withoutPrefix ? "" : "data:image/png;base64,"}${response}`)
			)
		})
		req.end();
	})