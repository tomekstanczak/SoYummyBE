const fs = require("fs/promises");
const jimp = require("jimp");

const MAX_AVATAR_WIDTH = 250;
const MAX_AVATAR_HEIGHT = 250;

const isImageAndTransform = async (path) =>
  new Promise((resolve) => {
    jimp.read(path, async (err, image) => {
      if (err) resolve(false);
      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > MAX_AVATAR_WIDTH ? MAX_AVATAR_WIDTH : w;
        const cropHeight = h > MAX_AVATAR_HEIGHT ? MAX_AVATAR_HEIGHT : h;
        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
          .write(path);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  });

// const updateAvatar = async (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "File is not a photo" });
//   }

//   const storageAvatarDir = path.join(process.cwd(), "public/avatars");

//   const { path: temporaryPath } = req.file;
//   const extension = path.extname(temporaryPath);
//   const fileName = `${uuidV4()}${extension}`;
//   const filePath = path.join(storageAvatarDir, fileName);

//   try {
//     await fs.rename(temporaryPath, filePath);
//   } catch (e) {
//     await fs.unlink(temporaryPath);
//     return next(e);
//   }
//   const isValidAndTransform = await isImageAndTransform(filePath);
//   if (!isValidAndTransform) {
//     await fs.unlink(filePath);
//     return res.status(400).json({ message: "Isnt a photo but pretending" });
//   }
//   const newAvatarURL = `/avatars/${fileName}`;
//   return newAvatarURL;
// };

module.exports = isImageAndTransform;
