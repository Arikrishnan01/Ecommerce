import fs from "fs";
import slugify from "slugify";
import productSchema from "../Models/productModel.js";
import categorySchema from "../Models/categoryModel.js";
import braintree from "braintree";
import dotenv from "dotenv";
import orderSchema from '../Models/orderModel.js';

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

/** create new product controller */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    /**check the valiodation  */
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const products = new productSchema({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    return res.status(200).json({
      success: true,
      message: "Product craeted successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in  create new Product",
      error: error.message,
    });
  }
};

/** get all products controller */
export const getAllProducts = async (req, res) => {
  try {
    const getProducts = await productSchema
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    if (getProducts) {
      return res.status(200).json({
        success: true,
        countTotal: getProducts.length,
        message: "Products fetched successfully",
        getProducts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Products couldn't find",
        getProducts,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in get All Products",
      error: error.message,
    });
  }
};

/** get single products */
export const getSingleProduct = async (req, res) => {
  try {
    const getProduct = await productSchema
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (getProduct) {
      return res.status(200).json({
        success: true,
        message: "Single Product fetched successfully",
        getProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "couldn't fetch Single Product",
        getProduct,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in get single product",
      error: error.message,
    });
  }
};

/**get products photo */
export const getProductPhoto = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.pid)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

/**delete product controller */
export const deleteProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    const product = await productSchema
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    if (product) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "Couldn't find the Product ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in delete product",
      error: error.message,
    });
  }
};

/** updateProduct constroller */
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productSchema.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Updte product",
    });
  }
};

/** products filter */
export const productsFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productSchema.find(args);
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Products Filetr",
      error: error.message,
    });
  }
};

/**product count */
export const productsCount = async (req, res) => {
  try {
    const total = await productSchema.find({}).estimatedDocumentCount();
    return res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productsList = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productSchema
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productSchema
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    return res.json(resutls);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const productsRelated = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productSchema
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productsCategory = async (req, res) => {
  try {
    const category = await categorySchema.findOne({ slug: req.params.slug });
    const products = await productSchema
      .find({ category })
      .populate("category");
    return res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};



//payment
export const braintreePayment = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderSchema({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          return res.json({ ok: true });
        } else {
          return res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

