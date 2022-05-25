const waifuGenerator = require("./index")

const main = async () => {
	return await Promise.all([
		waifuGenerator({ filename: "a_default" }),
		waifuGenerator({
			filename: "a_mosaic",
			mosaic: {
				number: 3
			}
		}),
		waifuGenerator({ weightInMbs: 33, filename: "a_macro" })
	])
}

main()