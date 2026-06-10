import React from "react";
import { useState } from "react";
import account2 from "../../assets/account2.jpg";
import Address from "../../components/shopping-view/address";
import { useSelector } from "react-redux";
import UserCartContent from "../../components/shopping-view/cart-content";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { createNewOrder } from "../../store/shop/order-slice";
import { toast } from "sonner";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userId = user?.id ?? user?._id ?? user?.Id ?? user?.ID;
  const cartTotal = cartItems?.reduce((sum, item) => {
    const unitPrice = item?.salePrice > 0 ? item.salePrice : item.price;
    const quantity = Number(item?.quantity || 0);
    return sum + unitPrice * quantity;
  }, 0);

  const handleInitiatePaypalPayment = () => {
    if(cartItems.length === 0){
      toast.error("Your cart is empty. Please add items to your cart before proceeding to payment.");
      return;
    }

    if(currentSelectedAddress === null){
      toast.error("Please select an address before proceeding to payment.");
      return;
    }

    if (!userId) {
      console.error("Cannot create order: missing userId");
      return;
    }
    if (!currentSelectedAddress) {
      console.error("Cannot create order: no address selected");
      return;
    }

    const orderData = {
      userId,
      cartId: cartItems?._id,
      cartItems: cartItems.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item.salePrice : item.price,
        quantity: item?.quantity,
      })),
      addressInfo: currentSelectedAddress,
      orderStatus: "Pending",
      paymentMethod: "Paypal",
      paymentStatus: "Pending",
      totalAmount: cartTotal,
      orderdate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData)).then((data) => {
     if(data?.payload?.approvalURL){
      window.location.href = data?.payload?.approvalURL;
     }
    })
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[300px] w-full overflow-hidden ">
        <img
          src={account2}
          alt="Account"
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          currentSelectedAddress={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartContent key={item._id} item={item} />
              ))
            : null}
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
