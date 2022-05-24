const randomizeImgUrl = () => {
	let output = {};

	/* Seeds available:
		- 100k seeds * 17 (18 when nothing is broken) on thisanimedoesnotexist
		- 100k * 2 on thiswaifudoesnotexist (v2 & v3)
		
		let's pick on 'thisanimedoesnotexist' 9 times out of 10
	*/

	const isSourceThisWaifuDoesNotExist = Math.ceil(Math.random() * 10) === 10;
	// Handle thiswaifudoesnotexist
	if (isSourceThisWaifuDoesNotExist) {
		const id = Math.ceil(Math.random() * 99999);
		// Randomize between v2 & v3
		const v2 = Math.floor(Math.random() * 2);
		const url = `https://www.thiswaifudoesnotexist.net/${v2 ? "v2/" : ""}example-${id}.jpg`;
		output = {
			url,
			id: String(id),
		}
	}
	// Handle thisanimedoesnotexist
	else {
		const creativityLevels = [
			"0-3",
			"0-4",
			"0-5",
			"0-6",
			"0-7",
			"0-8",
			"0-9",
			"1-0",
			"1-1",
			"1-2",
			"1-3",
			"1-4",
			"1-5",
			"1-6",
			"1-7",
			"1-8",
			"2-0",
		];
		// File naming conventions are a lil' different here: 
		// "example-1.jpg" on thiswaifu will be something like "seed00000.png" here
		const creativityLevel = creativityLevels[creativityLevels.length * Math.random() | 0]
		const randomImgId = Math.floor(Math.random() * 100000);
		const id = String(randomImgId).padStart(5, "0");
		const url = `https://thisanimedoesnotexist.ai/results/psi-${creativityLevel}/seed${id}.png`
		output = {
			id,
			url,
		}
	}

	return output;
}

module.exports = randomizeImgUrl;

