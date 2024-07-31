const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

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

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
