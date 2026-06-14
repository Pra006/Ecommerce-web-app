import React, { useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
} from "../../store/shop/cart-slice";
import { toast } from "sonner";
import StarRating from "../common/Star-rating";
import { Label } from "../ui/label";
import { addReview, getReview } from "../../store/shop/review-slice";
import { useEffect } from "react";

const ProductDetailsDialog = ({ open, setOpen, productdetails }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { reviews } = useSelector((state) => state.shopReview);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleAddReview = () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    dispatch(
      addReview({
        productId: productdetails?._id,
        userId: user?.id || user?._id || user?.Id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getReview(productdetails?._id));
        toast.success("Review added successfully");
        setReviewMsg("");
        setRating(0);
      } else {
        toast.error(data?.payload?.message || "Failed to add review");
      }
    });
  };

  useEffect(() => {
    if (productdetails !== null) {
      dispatch(getReview(productdetails?._id));
    }
  }, [productdetails]);

  function handleAddtoCart(getCurrentProductid, getTotalStock) {
    const userId = user?.id || user?._id || user?.Id;
    const currentCart = Array.isArray(cartItems) ? cartItems : [];

    if (currentCart.length) {
      const indexOfCurrentItem = currentCart.findIndex(
        (item) => String(item.productId) === String(getCurrentProductid),
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
            productId: getCurrentProductid,
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

    // Item not in cart yet
    dispatch(
      addToCart({
        userId,
        productId: getCurrentProductid,
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
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-8 max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto">
        {/* Left Side: Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-muted flex items-center justify-center aspect-square max-h-[400px] md:max-h-none">
          <img
            src={productdetails?.image}
            alt={productdetails?.title}
            className="object-contain md:object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {productdetails?.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {productdetails?.description || "absolut cinema"}
            </p>

            <div className="flex items-baseline gap-3 mt-4">
              {productdetails?.salePrice > 0 ? (
                <>
                  <span className="text-3xl font-bold text-foreground">
                    ${productdetails?.salePrice}
                  </span>
                  <span className="text-lg font-medium text-muted-foreground line-through">
                    ${productdetails?.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground">
                  ${productdetails?.price}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5 mt-2">
                <StarRating rating={averageReview} />
              </div>
              <span className="text-sm text-muted-foreground mt-3">
                ({averageReview.toFixed(1)})
              </span>
            </div>

            <div className="mt-6">
              {productdetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed py-6 text-base font-semibold">
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleAddtoCart(
                      productdetails?._id,
                      productdetails?.totalStock,
                    )
                  }
                  className="w-full py-6 text-base font-semibold"
                >
                  Add To Cart
                </Button>
              )}
            </div>
          </div>

          <Separator className="my-2" />

          {/* Reviews Section */}
          <div className="flex flex-col flex-1 min-h-[250px] max-h-[350px]">
            <h2 className="text-lg font-bold mb-3">Reviews</h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex gap-3 items-start bg-muted/30 p-3 rounded-lg"
                  >
                    <Avatar>
                      <AvatarFallback>
                        {review?.userName?.charAt(0)?.toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">
                          {review?.userName || "Anonymous"}
                        </h3>

                        <StarRating rating={review?.reviewValue} />
                      </div>

                      <p className="text-sm text-muted-foreground mt-2">
                        {review?.reviewMessage || "No review message"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No reviews yet
                </p>
              )}
            </div>

            <div className="mt-4 border rounded-lg p-4 space-y-4">
              <Label className="text-base font-semibold">Write a Review</Label>

              <StarRating
                rating={rating}
                handleRatingChange={handleRatingChange}
              />

              <div className="flex items-center gap-2">
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="flex-1"
                />
                <Button onClick={handleAddReview} disabled={!reviewMsg.trim()}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
