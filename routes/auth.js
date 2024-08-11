// ROUTE do -> Utwórz punkt końcowy rejestracji użytkownika.
// ROUTE do -> Utwórz punkt końcowy logowania użytkownika.
// ROUTE do -> Napisz warstwę autoryzacji.
// ROUTE do -> Utwórz punkt końcowy do odbierania informacji o użytkowniku.
// ROUTE do -> Utwórz punkt końcowy do aktualizacji danych użytkownika lub jednego z pól informacji kontaktowych o użytkowniku.
// ROUTE do -> Utwórz punkt końcowy do wylogowania użytkownika.
const express = require("express");

const auth = require("../middleware/authenticate");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/auth/authIndex");

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Creates a user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Account created
 */

//POST Creating user

router.post("/signup", createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Generate authorization token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: a user object
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 */

//POST Login user

router.post("/login", loginUser);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Logged out successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

// GET Logout user

router.get("/logout", auth, logoutUser);

/**
 * @swagger
 * /auth/currentUser:
 *   get:
 *     summary: Get a login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

// GET Current user

router.get("/currentUser", auth, getCurrentUser);

/**
 * @swagger
 * /auth/updateUser:
 *   patch:
 *     summary: Change user data
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *               message: "User updated successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

// PATCH Update user

router.patch(
  "/updateUser",
  auth,
  uploadMiddleware.single("avatar"),
  updateUser
);

module.exports = router;
