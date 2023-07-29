const express = require("express");

const sequelize = require("./database");

const productController = require("./controller/products");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/add-product", productController.postProduct);

app.use("/get-product", productController.getProduct);

app.use("/product/:id", productController.editProduct);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
