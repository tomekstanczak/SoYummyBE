// ROUTE do -> Utwórz punkt końcowy, aby wysłać list do użytkownika na adres e-mail, na który jest zarejestrowany, informując go, że zapisał się do newslettera So Yummy.
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authenticate");
const sendEmail = require("../controllers/subscribe/subscribeIndex");

/**
 * @swagger
 * /:
 *   post:
 *     summary: Send subscribe email
 *     tags: [Subscribe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *               name:
 *                 type:string
 *     responses:
 *       '201':
 *         description: Success
 */

router.post("/", auth, sendEmail);

module.exports = router;
