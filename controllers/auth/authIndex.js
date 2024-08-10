// Utwórz punkt końcowy rejestracji użytkownika.
// Utwórz punkt końcowy logowania użytkownika.
// Napisz warstwę autoryzacji.
// Utwórz punkt końcowy do odbierania informacji o użytkowniku.
// Utwórz punkt końcowy do aktualizacji danych użytkownika lub jednego z pól informacji kontaktowych o użytkowniku.
// Utwórz punkt końcowy do wylogowania użytkownika.
const gravatar = require("gravatar");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const fs = require("fs").promises;

const User = require("../../models/user");
const isImageAndTransform = require("./auth-service");

require("dotenv").config();

const { SECRET } = process.env;

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl"] },
    })
    .required(),
  name: Joi.string().min(3).max(35).required(),
  password: Joi.string().min(3).max(25).required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
  name: Joi.string().min(3).max(35),
  password: Joi.string().min(3).max(25),
});

const createUser = async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "This email is already taken" });
  }
  try {
    const generateAvatarURL = gravatar.url(email, {
      s: "250",
      r: "pg",
      d: "404",
    });
    const newUser = new User({ name, email, avatarURL: generateAvatarURL });
    await newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({ message: "Account created" });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email is wrong" });
  }
  const isPasswordCorrect = await user.validatePassword(password);

  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "12h" });
    user.token = token;
    user.save();
    return res.json({
      status: 200,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name, // Zwróć tylko to, co potrzebujesz
        },
      },
    });
  } else {
    return res.status(401).json({ message: "Password is wrong" });
  }
};

const logoutUser = async (req, res, next) => {
  console.log(req.user);
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    user.token = null;
    user.save();

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }
    return res.json({
      status: 200,
      data: { user },
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const updateUser = async (req, res, next) => {
  const { error, value } = updateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { _id } = req.user;
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (name) user.name = name;
    if (email) user.email = email;
    if (req.file) {
      const storageAvatarDir = path.join(process.cwd(), "public/avatars");

      const { path: temporaryPath } = req.file;
      const extension = path.extname(temporaryPath);
      const fileName = `${uuidV4()}${extension}`;
      const filePath = path.join(storageAvatarDir, fileName);

      try {
        await fs.rename(temporaryPath, filePath);
      } catch (e) {
        await fs.unlink(temporaryPath);
        return next(e);
      }
      const isValidAndTransform = await isImageAndTransform(filePath);
      if (!isValidAndTransform) {
        await fs.unlink(filePath);
        return res.status(400).json({ message: "Isnt a photo but pretending" });
      }
      const newAvatarURL = `/avatars/${fileName}`;
      user.avatarURL = newAvatarURL;
    }

    await user.save();
    return res.json({
      status: 200,
      data: { user },
      message: "User updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUser,
  //   updateAvatar,
};
