import paypal from "../../helper/paypal.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Products.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderdate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: Number(item.price).toFixed(2),
              currency: "USD",
              quantity: String(item.quantity ?? 1),
            })),
          },
          amount: {
            currency: "USD",
            total: Number(totalAmount).toFixed(2),
          },
          description: "Order Payment",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal create error:", error?.response || error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
          error: error?.response || error?.toString(),
        });
      }

      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderdate,
        orderUpdateDate,
        paymentId,
        payerId,
      });

      await newlyCreatedOrder.save();

      const approvalURL = paymentInfo.links.find(
        (link) => link.rel === "approval_url",
      )?.href;

      return res.status(201).json({
        success: true,
        approvalURL,
        orderId: newlyCreatedOrder._id,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already captured",
        data: order,
      });
    }

    paypal.payment.execute(
      paymentId,
      { payer_id: payerId },
      async (error, paymentInfo) => {
        if (error) {
          console.error("PayPal execute error:", error?.response || error);
          return res.status(500).json({
            success: false,
            message: "Error while capturing paypal payment",
            error: error?.response || error?.toString(),
          });
        }

        if (!paymentInfo || paymentInfo.state !== "approved") {
          return res.status(400).json({
            success: false,
            message: "PayPal payment was not approved",
            data: paymentInfo,
          });
        }

        order.paymentStatus = "paid";
        order.paymentId = paymentId;
        order.orderStatus = "confirmed";
        order.payerId = payerId;

        for (let item of order.cartItems) {
          const product = await Product.findById(item.productId);

          if (!product) {
            return res.status(404).json({
              success: false,
              message: `Product not found: ${item.title || item.productId}`,
            });
          }

          const quantity = Number(item.quantity ?? 1);
          if (Number.isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({
              success: false,
              message: `Invalid quantity for product ${product.title}`,
            });
          }

          if (product.totalStock < quantity) {
            return res.status(400).json({
              success: false,
              message: `Not enough stock for this product ${product.title}`,
            });
          }

          product.totalStock = product.totalStock - quantity;
          await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);
        await order.save();
        res.status(200).json({
          success: true,
          message: "Payment captured successfully",
          data: order,
          paypalPayment: paymentInfo,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

export const getAllOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};
