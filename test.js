const waifuGenerator = require("./index")



const main = async () => {

	await waifuGenerator({ filename: "a_default" })

	await waifuGenerator({
		filename: "a_mosaic",
		mosaic: {
			number: 2
		}
	})

	await waifuGenerator({ weightInMbs: 33, filename: "a_macro" })
}

main()