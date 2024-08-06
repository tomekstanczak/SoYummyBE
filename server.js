const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = require('./config/swagger-config');

const app = express();

require("dotenv").config();

const { DB_HOST: urlDb } = process.env;
const connection = mongoose.connect(urlDb);

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/subscribe", require("./routes/subscribe"));
app.use("/recipes", require("./routes/recipes"));
app.use("/ingredients", require("./routes/ingredients"));
app.use("/ownRecipes", require("./routes/ownRecipes"));
app.use("/favorite", require("./routes/favorite"));
app.use("/popular-recipe", require("./routes/popularRecipe"));
app.use("/shopping-list", require("./routes/shoppingList"));

//const specs = swaggerJsdoc(options);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message || "something broke!",
  });
});

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(process.env.PORT, async () => {
      console.log(`Server is running on port 8000`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();