// const productModel = require("../model/ProductModel");
// const { ProductProfileURL } = require("../cloudinary/ImageUrl");

// exports.AddProduct = async (req, res) => {
//   try {
//     const {
//       car_name,
//       Model,
//       FuelType,
//       Price,
//       transmission,
//       Mileage,
//       Color,
//     } = req.body;

   
//     const requiredFields = {
//       car_name,
//       Model,
//       FuelType,
//       Price,
//       transmission,
//       Mileage,
//       Color,
//     };

//     for (let key in requiredFields) {
//       if (!requiredFields[key]) {
//         return res.status(400).send({
//           status: false,
//           msg: `${key} is required.`,
//         });
//       }
//     }

   
//     if (!req.file || !req.file.buffer) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Car image is required." });
//     }

   
//     const existingCar = await productModel.findOne({ car_name });
//     if (existingCar) {
//       return res.status(409).send({
//         status: false,
//         msg: "Product with this car_name already exists.",
//       });
//     }

    
//     const uploadResult = await ProductProfileURL(req.file.buffer);
//     if (!uploadResult?.secure_url) {
//       return res.status(500).send({
//         status: false,
//         msg: "Image upload failed.",
//       });
//     }



   
//     const newProduct = await productModel.create({
//       car_name,
//       Model,
//       FuelType,
//       Price,
//       transmission,
//       Mileage,
//       Color,
//       Car_img: uploadResult.secure_url,
//     });

//     return res.status(201).send({
//       status: true,
//       msg: "Product added successfully.",
//       data: newProduct,
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(409).send({
//         status: false,
//         msg: "Duplicate car_name not allowed.",
//       });
//     }

//     return res.status(500).send({
//       status: false,
//       msg: "Server error",
//       error: err.message,
//     });
//   }
// };



const productModel = require("../model/ProductModel");
const { ProductProfileURL } = require("../cloudinary/ImageUrl");

// Add Product
exports.AddProduct = async (req, res) => {
  try {
    const {
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
    } = req.body;

    const requiredFields = {
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
    };

    for (let key in requiredFields) {
      if (!requiredFields[key]) {
        return res.status(400).send({
          status: false,
          msg: `${key} is required.`,
        });
      }
    }

    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .send({ status: false, msg: "Car image is required." });
    }

    const existingCar = await productModel.findOne({ car_name });
    if (existingCar) {
      return res.status(409).send({
        status: false,
        msg: "Product with this car_name already exists.",
      });
    }

    const uploadResult = await ProductProfileURL(req.file.buffer);
    if (!uploadResult?.secure_url) {
      return res.status(500).send({
        status: false,
        msg: "Image upload failed.",
      });
    }

    const newProduct = await productModel.create({
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
      Car_img: uploadResult.secure_url,
    });

    return res.status(201).send({
      status: true,
      msg: "Product added successfully.",
      data: newProduct,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({
        status: false,
        msg: "Duplicate car_name not allowed.",
      });
    }

    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

// Get All Products
exports.GetAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();

    if (allProducts.length === 0) {
      return res.status(404).send({
        status: false,
        msg: "No products found.",
      });
    }

    return res.status(200).send({
      status: true,
      msg: "All products fetched successfully.",
      data: allProducts,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

// Update Product
exports.UpdateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    let updatedData = { ...updates };

    // Optional: handle image update
    if (req.file && req.file.buffer) {
      const uploadResult = await ProductProfileURL(req.file.buffer);
      if (!uploadResult?.secure_url) {
        return res.status(500).send({
          status: false,
          msg: "Image upload failed.",
        });
      }
      updatedData.Car_img = uploadResult.secure_url;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        status: false,
        msg: "Product not found.",
      });
    }

    return res.status(200).send({
      status: true,
      msg: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

// Delete Product
exports.DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({
        status: false,
        msg: "Product not found.",
      });
    }

    return res.status(200).send({
      status: true,
      msg: "Product deleted successfully.",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};


