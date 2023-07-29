const productData = require("../model/products");

exports.postProduct = (req, res, next) => {
  const { name, description, amount, quantity } = req.body;

  if (!name || !description || !amount || !quantity) {
    return res.status(400).json({
      error: "Name, Description, Amount and Quantity are required fields!",
    });
  }

  productData
    .create({
      name: name,
      description: description,
      amount: amount,
      quantity: quantity,
    })
    .then((createdProducts) => {
      res.status(201).json({
        message: "ProductsData added successfully!",
        data: createdProducts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  productData
    .findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  const productId = req.params.id;
  const newQuantity = req.body.quantity;
  // console.log(newQuantity)
  // console.log(productId);
  productData
    .update(
      {
        quantity: newQuantity,
      },
      // {
      //   where: productId,
      // },
      { returning: true, where: { id: productId } }
    )
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the product" });
    });
};
