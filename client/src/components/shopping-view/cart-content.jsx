import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from "../../store/shop/cart-slice";

import { toast } from "sonner";

const UserCartContent = ({ item }) => {
  if (!item) return null;

  const unitPrice = item?.salePrice > 0 ? item.salePrice : item.price || 0;
  const quantity = Number(item?.quantity || 0);
  const lineTotal = unitPrice * quantity;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || user?._id || user?.Id;

  function handleDeleteItem(currentItem) {
    const productId = currentItem?.productId || currentItem?._id;
    if (!userId || !productId) {
      toast.error("Unable to remove item from cart.");
      return;
    }

    dispatch(deleteCartItem({ userId, productId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart");
      }
    });
  }

  function handleUpdateQuantity(currentItem, type) {
    const productId = currentItem?.productId || currentItem?._id;
    const currentQuantity = Number(currentItem?.quantity || 0);
    const totalStock = Number(currentItem?.totalStock);

    let newQuantity =
      type === "plus" ? currentQuantity + 1 : currentQuantity - 1;

    if (
      type === "plus" &&
      Number.isFinite(totalStock) &&
      newQuantity > totalStock
    ) {
      toast.error(`Only ${totalStock} items left in stock`);
      return;
    }

    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    dispatch(
      updateCartItemQuantity({ userId, productId, quantity: newQuantity }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Cart updated successfully");
      } else {
        toast.error("Failed to update cart");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={item.image}
        alt={item.title}
        className="h-24 w-24 rounded-3xl object-cover shadow-sm"
      />

      <div className="flex-1 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm text-slate-500">
              ${Number(unitPrice).toFixed(2)} each
            </p>
          </div>
          <div className="text-right text-sm font-semibold text-slate-900">
            ${Number(lineTotal).toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
            <Button
              onClick={() => handleUpdateQuantity(item, "minus")}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="min-w-[32px] text-center text-sm font-semibold text-slate-800">
              {quantity}
            </span>
            <Button
              onClick={() => handleUpdateQuantity(item, "plus")}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>

          <Button
            onClick={() => handleDeleteItem(item)}
            variant="ghost"
            className="text-red-500 hover:bg-red-50"
          >
            <Trash className="w-4 h-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCartContent;
