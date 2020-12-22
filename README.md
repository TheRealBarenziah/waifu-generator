# waifu-generator
<p align="center">
  <img width="300" src="https://i.ibb.co/VWHXh3F/javascriptchan.png">
</p>
<p align="center">
Write random anime girl pictures on file system, using Nodejs, thanks to <a href="https://www.thiswaifudoesnotexist.net">thiswaifudoesnotexist.net</a>
</p>

# Usecase ?
You need to generate random pictures files for testing purposes, but [js-image-generator](https://www.npmjs.com/package/js-image-generator) is definitely too efficient and boring for the job?  
  
Look no further! TheRealBarenziah(tm) brings you this StyleGAN2-empowered [*](#BTW), uwu-compliant, industrial grade yet unlicensed module.  

# Compatibility
node >= 8 (we're using [fs](https://nodejs.org/api/fs.html) and [promises](https://node.green/))

# Use
```bash
npm i --save-dev waifu-generator
```  
### Case 1 : default (no option object)
In your `generate.js` file : 
```javascript
const generateWaifu = require("waifu-generator");

generateWaifu();
```  
Back in terminal:  
```bash
node ./generate.js
# ...will write a random image file in pwd
# filename will be named following this pattern: "$imageId_$uuid.jpg"
# where $imageId is the image id for thiswaifudoesnotexist.net
# and $uuid, an uuidv4 generated on the fly
```  
### Case 2 : providing an option object
In your `generate.js` file : 
```javascript
const generateWaifu = require("waifu-generator");

const options = {
  filename: "sugoi_kawaii",
  path: "./__TESTS__/images"
}

generateWaifu(options);
```  
Back in terminal:  
```bash
node ./generate.js
# ...will write a random image file in ./__TESTS__/images
# and its filename will be "sugoi_kawaii.jpg" 
```  
NB: `options` object is facultative; `options.filename` and `options.path` [default to null](https://github.com/TheRealBarenziah/waifu-generator/blob/senpai/index.js#L22). Make sure you avoid typos! (`options.fileName` won't work)  

You can also pass a single option: providing a `filename` but no `path`, the `path` will default to root.  
Providing a valid `path` but no `filename`, `filename` will be generated using the standard pattern.  

# BTW
Please don't read this seriously. This JavaScript does little more than exploiting the awesome work that was done on [thiswaifudoesnotexist](https://www.thiswaifudoesnotexist.net), so please pay them a visit!  
Inspect the elements to see what inspired this module, and follow the urls in their footer to learn about what is actually going on, and explore other weeb-friendly implementations of StyleGAN!  