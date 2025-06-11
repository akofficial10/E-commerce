import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      bestseller,
      description,
      benefits,
      keyIngredients,
      skinType,
      volume,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
      benefits,
      keyIngredients,
      skinType,
      volume: Number(volume)
    };

    console.log(productData)

    const product = new productModel(productData)
    await product.save()

    res.json({success: true, message:"Product added"});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({success: true, products})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message:"Product removed"})
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

// Function for single product details
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success: true, product})
  } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
  }
};



export { addProduct, listProducts, removeProduct, singleProduct };
