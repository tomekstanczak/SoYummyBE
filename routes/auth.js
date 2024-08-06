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

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/currentUser", auth, getCurrentUser);
router.patch(
  "/updateUser",
  auth,
  uploadMiddleware.single("avatar"),
  updateUser
);

module.exports = router;
