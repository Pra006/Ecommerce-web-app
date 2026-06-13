import Cart from "../../models/Cart.js";
import product from "../../models/Products.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "userId, productId and quantity are required",
      });
    }
    const foundProduct = await product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({
        userId,
        items: [],
      });
    }
    const findCurrentProductIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    const currentQuantity =
      findCurrentProductIndex === -1
        ? 0
        : Number(userCart.items[findCurrentProductIndex].quantity) || 0;
    const nextQuantity = currentQuantity + Number(quantity);

    if (nextQuantity > Number(foundProduct.totalStock)) {
      return res.status(400).json({
        success: false,
        message: `Only ${foundProduct.totalStock} items left in stock`,
      });
    }

    if (findCurrentProductIndex === -1) {
      userCart.items.push({ productId, quantity });
    } else {
      userCart.items[findCurrentProductIndex].quantity = nextQuantity;
    }
    await userCart.save();
    res.status(200).json({
      success: true,
      data: userCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const validItems = cart.items.filter(
      (productItem) => productItem.productId,
    );
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      totalStock: item.productId.totalStock,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch item to cart",
      error: error.message,
    });
  }
};
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "userId, productId and quantity are required",
      });
    }
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const findCurrentProductIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const foundProduct = await product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (Number(quantity) > Number(foundProduct.totalStock)) {
      return res.status(400).json({
        success: false,
        message: `Only ${foundProduct.totalStock} items left in stock`,
      });
    }

    userCart.items[findCurrentProductIndex].quantity = quantity;
    await userCart.save();
    await userCart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    const populateCartItems = userCart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      totalStock: item.productId ? item.productId.totalStock : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...userCart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }
    const userCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    userCart.items = userCart.items.filter(
      (item) => item.productId._id.toString() !== productId,
    );
    await userCart.save();
    await userCart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    const populateCartItems = userCart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      totalStock: item.productId ? item.productId.totalStock : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...userCart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};
export { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem };
