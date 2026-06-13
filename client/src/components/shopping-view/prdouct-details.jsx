import React from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems, updateCartItemQuantity } from "../../store/shop/cart-slice";
import { toast } from "sonner";

const ProductDetailsDialog = ({ open, setOpen, productdetails }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

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

            <div className="flex items-center gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
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

            {/* Scrollable Container for Reviews list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
              {/* Review Item */}
              <div className="flex gap-3 items-start bg-muted/30 p-3 rounded-lg">
                <Avatar className="w-9 h-9 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Prakash Kushwaha</h3>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky/Bottom Write Review Form */}
            <div className="flex gap-2 items-center pt-2 border-t mt-auto">
              <Input placeholder="Write a review..." className="flex-1" />
              <Button size="sm">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
