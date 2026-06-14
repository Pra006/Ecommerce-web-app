import React from "react";

import { Button } from "../../components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Shirt,
  ShoppingBag,
  Baby,
  Handbag,
  SportShoe,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  clearProductDetails,
} from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/index";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import ProductDetailsDialog from "../../components/shopping-view/prdouct-details";
import { getFeatureImage } from "../../store/common-slice/index.js";

const categories = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: ShoppingBag },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Handbag },
  { id: "footwear", label: "Footwear", icon: SportShoe },
];

const brandOptions = [
  { id: "nike", label: "Nike", icon: ShoppingBag },
  { id: "adidas", label: "Adidas", icon: ShoppingBag },
  { id: "puma", label: "Puma", icon: ShoppingBag },
  { id: "zara", label: "Zara", icon: ShoppingBag },
  { id: "h&m", label: "H&M", icon: ShoppingBag },
];

const ShoppingHome = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productdetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || user?._id || user?.Id;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const slides = featureImageList?.filter((i) => i?.image) || [];

  const normalizeImageUrl = (url) => {
    if (!url) return url;
    return url.replace(/^http:\/\//i, "https://");
  };

  useEffect(() => {
    console.log("FeatureImageList (raw):", featureImageList);
    slides.forEach((s) => console.log("raw:", s.image, "normalized:", normalizeImageUrl(s.image)));
  }, [featureImageList]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  function handleCategoryClick(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentfilters = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentfilters));
    navigate("/shop/listing");
  }

  function handleAddtoCart(productId) {
    dispatch(
      addToCart({
        userId,
        productId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Product added to cart");
      }
    });
  }

  function handleGetProductDetails(product) {
    setSelectedProduct(product);
    setOpenDialog(true);

    dispatch(clearProductDetails());

    if (product?._id) {
      dispatch(fetchProductDetails(product._id));
    }
  }

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  return (
    <div className=" flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={slide._id}
            src={normalizeImageUrl(slide.image)}
            alt={`Feature ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <Button
          type="button"
          onClick={() => {
            setCurrentSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1,
            );
          }}
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => {
            setCurrentSlide((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1,
            );
          }}
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            {categories.map((category) => (
              <Card
                onClick={() => handleCategoryClick(category, "category")}
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 text-primary h-12 mb-4" />
                  <span className="font-bold ">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            {brandOptions.map((brand) => (
              <Card
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="w-12 text-primary h-12 mb-4" />
                  <span className="font-bold ">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 px-8 gap-8">
            {productList && productList.length > 0
              ? productList.map((product) => (
                  <ShoppingProductTile
                    key={product._id || product.id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDialog}
        setOpen={(val) => {
          setOpenDialog(val);

          if (!val) {
            setSelectedProduct(null);
            dispatch(clearProductDetails());
          }
        }}
        productdetails={selectedProduct}
      />
    </div>
  );
};

export default ShoppingHome;
