const fs = require('fs');
const httpsGet = require('./httpsGet');

const macrophilia = async ({ pathOpts, skipFs, withoutPrefix, weightInMbs, imgSource }) =>
	new Promise((resolve, reject) => {
		const image = httpsGet({
			imgSource,
			pathOpts,
			withoutPrefix,
			skipFs,
		})
		resolve(image)
	})


module.exports = macrophilia;