const https = require('https');
const fs = require('fs');
const uuidv4 = require("uuid").v4;
const mosaic = require('./mosaic');
const macrophilia = require('./macrophilia');
const { randomizeImgUrl, randomizeHost } = require('./randomizeImgUrl');
const httpsGet = require('./httpsGet');

/**
 * @description
 * Write a random waifu image file on file system. Default to an uuid filename & root path (of parent process).
 * You can also pass an option Object with custom 'filename' and 'path' values.
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.filename - Pass some string to chose an arbitrary filename Ex: megumin
 * @param {string} options.path - Pass some path (relative to parent process). Ex: './__TESTS__/images'
 * @param {boolean} option.skipFs - Disable fs call; useful for working with RAM only. Care as it's making the other options irrelevant !
 * @param {boolean} option.withoutPrefix - Remove 'data:image/png;base64,' prefix before base64 data; default to false
 * @param {Object} option.mosaic - Enable mosaic mode. See README for documentation
 * @returns {Promise.<string|Error>}
 *    A promise that will either Resolve with base64 string representation of the image when file is successfully written, 
 *    and otherwise Reject Error object.
 * @example
 *     generateWaifu({path: "/images", filename:"megumin"})
 *       .then(res => console.log(res)) // data:image/png;base64,/9j/base64encodedblahblahblah
 *       .catch(err => console.error(err))
 */

const generateWaifu = async (options) =>
	new Promise((resolve, reject) => {
		const {
			filename = null,
			path = null,
			skipFs = false,
			withoutPrefix = false,
		} = { ...options };
		const hostname = randomizeHost();
		const imgSource = randomizeImgUrl(hostname)

		const handleOptions = () => {
			if (filename && path) {
				return `${path}/${filename}.png`
			}
			else if (filename && !path) {
				return `${filename}.png`
			}
			else if (!filename && path) {
				return `${path}/${imgSource.id}_${uuidv4()}.png`
			}
			else {
				return `${imgSource.id}_${uuidv4()}.png`
			}
		};

		const pathOpts = handleOptions();

		// Mosaic mode
		if (options) {
			if (options.mosaic) {
				return mosaic({
					...options,
					pathOpts,
					hostname,
					number: options.mosaic.number,
					mergeImgOpts: options.mosaic.options,
				})
					.then(res => {
						resolve(res)
					})
					.catch(e => reject(e))
			}
			if (options.weightInMbs) {
				const requestedFileSize = typeof options.weightInMbs === "number" ? options.weightInMbs : 32.1;
				return macrophilia({
					...options,
					pathOpts,
					imgSource,
					weightInMbs: requestedFileSize,
				})
			}
		}
		// Standard mode
		return httpsGet({
			...options,
			pathOpts,
			imgSource,
		})
	});

module.exports = generateWaifu;