import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSearchResult,
  resetSearchResults,
} from "../../store/shop/search-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import {
  fetchCartItems,
  updateCartItemQuantity,
} from "../../store/shop/cart-slice";
import { addToCart } from "../../store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "../../components/shopping-view/prdouct-details";

const ShoppingSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParamas, setSearchParams] = useState({});
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productdetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || user?._id || user?.Id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(productId, getTotalStock) {
    const currentCart = Array.isArray(cartItems) ? cartItems : [];

    if (currentCart.length) {
      const indexOfCurrentItem = currentCart.findIndex(
        (item) => String(item.productId) === String(productId),
      );

      if (indexOfCurrentItem > -1) {
        const currentQuantity =
          Number(currentCart[indexOfCurrentItem].quantity) || 0;

        if (currentQuantity + 1 > Number(getTotalStock)) {
          toast.error(`Only ${getTotalStock} items left in stock`);
          return;
        }

        dispatch(
          updateCartItemQuantity({
            userId,
            productId,
            quantity: currentQuantity + 1,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems({ userId }));
            toast.success("Cart quantity updated");
          } else {
            toast.error(data?.payload?.message || "Failed to update cart");
          }
        });

        return;
      }
    }
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
      } else {
        toast.error(data?.payload?.message || "Failed to add product to cart");
      }
    });
  }
  useEffect(() => {
    if (productdetails) {
      setSelectedProduct(productdetails);
    }
  }, [productdetails]);

  function handleGetProductDetails(product) {
    setSelectedProduct(product);
    setOpenDialog(true);

    dispatch(clearProductDetails());

    if (product?._id) {
      dispatch(fetchProductDetails(product._id));
    }
  }

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Products...."
            type="text"
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-3xl font-extrabold"> No result found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {searchResults.map((searchitem) => (
          <ShoppingProductTile
            handleGetProductDetails={handleGetProductDetails}
            handleAddtoCart={handleAddtoCart}
            product={searchitem}
          />
        ))}
      </div>
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

export default ShoppingSearch;
