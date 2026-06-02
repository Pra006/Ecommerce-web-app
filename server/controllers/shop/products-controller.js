import Product from "../../models/Products.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    const sortValue =
      !sortBy || sortBy === "undefined" ? "price-lowtohigh" : sortBy;
    let filter = {};

    if (category.length) filter.category = { $in: category.split(",") };
    if (brand.length) filter.brand = { $in: brand.split(",") };
    let sort = {};
    switch (sortValue) {
      case "price-lowtohigh":
        sort.price = 1;
        break;

      case "price-hightolow":
        sort.price = -1;
        break;

      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filter).sort(sort);
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({
      success: true,
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error product details", error: error.message });
  }
};

export { getFilteredProducts, getProductDetails };
