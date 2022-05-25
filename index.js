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
 * @param {Object} options - Passing Option object as parameter is optional
 * @param {string} options.filename - Pass some string to chose an arbitrary filename Ex: megumin
 * @param {string} options.path - Pass some path (relative to parent process). Ex: './__TESTS__/images'
 * @param {boolean} options.skipFs - Disable fs call; useful for working with RAM only. Care as it's making the other options irrelevant !
 * @param {boolean} options.withoutPrefix - Remove 'data:image/png;base64,' prefix before base64 data; default to false
 * @param {Object} options.mosaic - Enable mosaic mode. (Not compatible with macrophilia mode)
 * @param {Object} options.mosaic.number - Number of images in the mosaic. Must be in 1-99 range
 * @param {Object} options.mosaic.options - Override merge-img options. See README for more details
 * @param {Object} options.macrophilia - Enable macrophilia mode. (Not compatible with mosaic mode)
 * @param {number} options.macrophilia.height - Specify height of output (which is always a square)
 * @param {boolean} options.macrophilia.thiqq - Maximize file size of png output

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

		if (options) {
			if (options.mosaic) {
				// Handle Mosaic mode
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
			if (options.macrophilia) {
				// Handle Macrophilia mode
				const height = typeof options.macrophilia.height === "number" ?
					options.macrophilia.height
					:
					1024;
				const thiqq = options.macrophilia.thiqq ? true : false;
				return macrophilia({
					...options,
					pathOpts,
					imgSource,
					height,
					thiqq
				})
					.then(res => {
						resolve(res)
					})
					.catch(e => reject(e))
			}
		}
		// Standard mode
		return httpsGet({
			...options,
			pathOpts,
			imgSource,
		}).then(res => resolve(res))
			.catch(e => reject(e))
	});

module.exports = generateWaifu;