# waifu-generator
<p align="center">
  <a href="https://www.deviantart.com/icw-numen/art/JavaScript-chan-762039250">  
  <img width="300" src="https://i.ibb.co/VWHXh3F/javascriptchan.png">
  </a>
</p>
<p align="center">
Write random anime girl pictures on file system, using Nodejs, thanks to <a href="https://www.thiswaifudoesnotexist.net">thiswaifudoesnotexist.net</a>
</p>  

[![https://nodei.co/npm/waifu-generator.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/waifu-generator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/waifu-generator)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/TheRealBarenziah/waifu-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TheRealBarenziah/waifu-generator?targetFile=package.json)

# Usecase ?
You need to generate random pngs for testing purposes, but [js-image-generator](https://www.npmjs.com/package/js-image-generator) is definitely too efficient and boring for the job?  
  
Look no further! TheRealBarenziah(tm) brings you this StyleGAN2-empowered[*](#BTW),industrial grade, uwu-compliant, yet unlicensed module!  

# Compatibility
**node >= 8** (we're using [promises](https://node.green/))

# Use
```bash
npm i --save-dev waifu-generator
```  

**tl;dr** 
- `options` object is facultative 
- `options.filename` default to null
- `options.path` default to null 
- `options.skipFs` default to false; pass `true` to skip the fs.createWriteStream() call
- `options.withoutPrefix` default to false; pass `true` to remove 'data:image/png;base64,' prefix from returned string
- `options.mosaic` default to null; enable to create a mosaic of waifus. [Infos here](#Mosaic)

## The Long Read

### Case 1 : default (no option object)
In your `generate.js` file : 
```javascript
const generateWaifu = require("waifu-generator");

generateWaifu()
  .then(res => console.log(res))
  .catch(e => console.error(e));
```  
Back in terminal (for the example):  
```bash
node ./generate.js
# ...will write a random image file in cwd (current working directory).
# The filename will follow the pattern "$imageId_$uuid.png",
#     where $imageId is the image id for thiswaifudoesnotexist.net,
#     and $uuid some uuidv4 generated on the fly

data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=

# Since we logged the return value with .then(res => console.log(res))
# a base64 string representation of our image is printed in stdout.
# It is facultative, but may come in handy. You can check the string by copypasting it 
# into your favorite browser, or whatever. Just know it's there, in the resolve value !
```  
### Case 2 : providing an option object
In your `generate.js` file : 
```javascript
const generateWaifu = require("waifu-generator");

const options = {
  filename: "sugoi_kawaii",
  path: "./__TESTS__/images"
};

generateWaifu(options);
```  
Back in terminal:  
```bash
node ./generate.js
# ...will write a random image file in "./__TESTS__/images",
#     with "sugoi_kawaii.png" as its filename.
#
# No output since we didn't explicitely '.then(res => console.log(res));'
```  

### Case 2.5: skip the fs call
Sometimes, you don't want your tests to do I/O operations (typically when you're after performance). In that case you can skip the filesystem call entierely, leaving you to work with pure base64 strings, ready to be allocated.  
  
Barebone example:  
```javascript
const generateWaifu = require("waifu-generator");

const yourCustomFunc = async () => {
  const base64waifu = await generateWaifu({ skipFs: true });

  const output = base64waifu.toString().toString().toString(); 
  // Example of arbitrary filth you're free to inflict to your base64 waifu here

  console.log(output); // printing our stuff
  return output;
};

yourCustomFunc();
```  
  
**NB: Activating `skipFs` will indeed make the path/filename options irrelevant !**  

# Mosaic
Available from 2.0.0 onward. Opt-in by defining `option.mosaic`:
#### tl;dr
```javascript
const waifuGenerator = require("./index")

waifuGenerator({
  filename: "mosaic", // indeed compatible with other waifu-generator options
  mosaic: {
    number: 2, // mandatory; must be integer in 1-99 range
    options: { // facultative merge-img option object
      direction: true,
      color: 0x000000
    }
  }
})
```  
#### Full story
Made this a major release because it adds some bloat ([jimp](https://www.npmjs.com/package/jimp) + [merge-img](https://www.npmjs.com/package/merge-img) dependencies).  
If you don't need this feature, you better stick to good ol' [1.1.1](https://www.npmjs.com/package/waifu-generator/v/1.1.1)  
###### So why this update ?
Initial pool of images being only 100000, there was a chance to get duplicates.  
Also, I needed to be able to generate some FAT files (>32Mb and >64Mb) for my test suite.  
This option will generate a mosaic of waifus so the possibilities becomes `100000` * `a lot`.  
The `option.mosaic.number` param is **mandatory** and must be in the 1-99 range.  
The `option.mosaic.options` is **optional**: it enable you to use [merge-img option object](https://www.npmjs.com/package/merge-img#mergeimgimages-options) in case you need it.  
With this the possibilities becomes `100000` * `a lot` * `A LOT`.  
I know math, you can twust this number owo. Example output with `mosaic.number = 3`:  

<p align="center">
  <img width="700" src="https://i.ibb.co/kMc3ZNM/66579-a5581238-2f1d-4221-96f2-ea38a3aa100f.png">
</p>

# Clean your mess
This (somewhat unbloated) module doesn't support file deletion. To do that, it's your responsibility, as a developer, to chose the correct approach between using the awesome [fs API](https://www.geeksforgeeks.org/node-js-fs-unlink-method/), using [higher level libs](https://www.npmjs.com/package/rimraf), or going for [OS level operation](https://linux.die.net/man/1/rm).  

..Of course you're also free to skip the hassle by using the `skipFs` parameter !  

Take advantage of this module being unlicensed: please fork away and write the best solution for your specific need :)

# BTW
Please don't read this seriously. This JavaScript does little more than exploiting the awesome work that was done on [thiswaifudoesnotexist](https://www.thiswaifudoesnotexist.net), so please pay them a visit and click their footer links :)  