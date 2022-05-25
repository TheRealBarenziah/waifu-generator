// This needs to be separate to handle mosaic mode (different hosts => different image size => ugly mosaic)
const randomizeHost = () => {
	/* Seeds available:
	- 100k seeds * 17 (18 when nothing is broken) on thisanimedoesnotexist
	- 100k * 2 on thiswaifudoesnotexist (v2 & v3)
	
	let's pick on 'thisanimedoesnotexist' 9 times out of 10
*/
	return Math.ceil(Math.random() * 10) === 10 ?
		"www.thiswaifudoesnotexist.net"
		:
		"thisanimedoesnotexist.ai"
}

/**
 * @returns {Object} { hostname: "string", path: "string", id: "string" }
 */
const randomizeImgUrl = (hostname) => {
	let output = {};

	// Handle thiswaifudoesnotexist
	if (hostname === "www.thiswaifudoesnotexist.net") {
		const id = Math.ceil(Math.random() * 99999);
		// Randomize between v2 & v3
		const v2 = Math.floor(Math.random() * 2);
		const path = `/${v2 ? "v2/" : ""}example-${id}.jpg`;
		output = {
			hostname,
			path,
			id: String(id),
		}
	}
	// Handle thisanimedoesnotexist
	else {
		const creativityLevels = [
			"0.3",
			"0.4",
			"0.5",
			"0.6",
			"0.7",
			"0.8",
			"0.9",
			"1.0",
			"1.1",
			"1.2",
			"1.3",
			"1.4",
			"1.5",
			"1.6",
			"1.7",
			"1.8",
			"2.0",
		];
		// File naming conventions are a lil' different here: 
		// "example-1.jpg" on thiswaifu will be something like "seed00000.png" here
		const creativityLevel = creativityLevels[creativityLevels.length * Math.random() | 0]
		const randomImgId = Math.floor(Math.random() * 100000);
		const id = String(randomImgId).padStart(5, "0");
		const path = `/results/psi-${creativityLevel}/seed${id}.png`
		output = {
			hostname,
			path,
			id,
		}
	}

	return output;
}

module.exports = {
	randomizeHost,
	randomizeImgUrl
}

