# 3.0.0: thiqq girls & performance
As I mentioned, the 2.0 "mosaic update" purpose was to help me generate >32Mb files for my test suite.  
While it kinda works, it suffers for terrible, terrible performance, to the point it sometimes fail the test suite because it couldn't manage the mosaic in the [3600000(!)ms timeout I explicitly set for it.](https://github.com/TheRealBarenziah/imgbb-uploader/blob/7e6d98e85f36c536d93927a2c431ad7ddf721b01/src/__tests__/require/bigFileExplicitThrow.js#L6). Tests are supposed to be (at least somewhat) quick to run, this is too outrageaous to bear.  
  
That's where the new mode "macrophilia" comes in. It's using [sharp](https://sharp.pixelplumbing.com/performance), which is a great module with nice interface & performance, to resize the image as much as I need, and returns approximately 100* quicker than mosaic mode.  
  
I'm now swiftly creating 33Mb images using `5742` as height value & `thiqq` parameter set to `true`, which is perfect for my use case 😸
  
Mosaic mode still serves the purpose of generating near-infinity different (in a shasum context) images, & stays fun to use with `number` in the single digit range, so it'll stay here.
  
Last but not least, I took the opportunity to refacto the code so it'll be a bit easier to maintain (tbh I've never thought this module would go beyond 1.0). It allowed me to spot the JSDOC being totally broken: it should be fine now.
  
While I was at it, I noticed how easy it would be to *19 the pool of images using [thisanimedoesntexist](https://thisanimedoesnotexist.ai/) along TWDNE, so I did that.  
  
This is a ["breaking change"](https://semver.org/) in some way (for instance, if you had FW exceptions for TWDNE or relied on images having a fixed width/height), hence the major version upgrade.

# 2.0.0 update: bloat & mosaic
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

# 1.0.0 - A simpler module for simpler times

This module is born out of three things:
- A need of random image generation for [imgbb-uploader](https://github.com/TheRealBarenziah/imgbb-uploader) module
- An urge to make good use of the scientific & civilizational breakthrough that are StyleGAN-generated anime girls
- Fun !