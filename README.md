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
Back in terminal (for the example):  
```bash
node ./generate.js
# ...will write a random image file in cwd (current working directory).
# The filename will follow this pattern: "$imageId_$uuid.jpg",
#     where $imageId is the image id for thiswaifudoesnotexist.net,
#     and $uuid is some uuidv4 generated on the fly
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
# ...will write a random image file in "./__TESTS__/images",
#     with "sugoi_kawaii.jpg" as its filename
```  
NB: `options` object is facultative; `options.filename` and `options.path` [default to null](https://github.com/TheRealBarenziah/waifu-generator/blob/senpai/index.js#L22). Make sure you avoid typos! (`options.fileName` won't work)  

You can also pass a single option: providing a `filename` but no `path`, the `path` will default to root.  
Providing a valid `path` but no `filename`, `filename` will be generated using the standard pattern.  

# Cleaning your mess
This unbloated module doesn't support file deletion. To do that, it's your responsibility, as a developer to chose between using the awesome [fs API](https://www.geeksforgeeks.org/node-js-fs-unlink-method/), [higher level libs](https://www.npmjs.com/package/rimraf), or [OS level operation](https://linux.die.net/man/1/rm).  
Take advantage of this module being unlicensed, fork away and write the best solution for your specific need !

# BTW
Please don't read this seriously. This JavaScript does little more than exploiting the awesome work that was done on [thiswaifudoesnotexist](https://www.thiswaifudoesnotexist.net), so please pay them a visit!  
Inspect the elements to see what inspired this module, and follow the urls in their footer to learn about what is actually going on, and explore other weeb-friendly implementations of StyleGAN!