const jimp = require("jimp");

const isImageAndTransform = async (path, MAX_AVATAR_WIDTH, MAX_AVATAR_HEIGHT) =>
  new Promise((resolve) => {
    jimp.read(path, async (err, image) => {
      if (err) resolve(false);
      try {
        await image
          .rotate(360)
          .resize(MAX_AVATAR_WIDTH, MAX_AVATAR_HEIGHT)
          .write(path);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  });

module.exports = isImageAndTransform;
