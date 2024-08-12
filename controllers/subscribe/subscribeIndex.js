// Utwórz punkt końcowy, aby wysłać list do użytkownika na adres e-mail, na który jest zarejestrowany, informując go, że zapisał się do newslettera So Yummy.
const mail = require("./subscribe-service");

const sendEmail = async (req, res, next) => {
  console.log(req.user);
  const { name, email } = req.user;
  try {
    await mail(
      `<h3>Witaj, ${name}</h3><p>Zapisałeś się do newslettera SoYummy</p> `,
      "SoYummy newsletter",
      email
    );
    res.status(200).json({
      status: 200,
      message: "Email send",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
