import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const {user} = useSelector(state => state.auth)
  return (
    <div>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?._id || orderDetails?.id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderdate?.split("T")[0] || "—"}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`px-2 py-1 text-xs ${orderDetails?.orderStatus === "confirmed" ? "bg-green-500" : "bg-red-500"}`}
                >
                  {orderDetails?.orderStatus || "—"}
                </Badge>
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.totalAmount || "—"}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>${orderDetails?.paymentMethod || "—"}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>${orderDetails?.paymentStatus || "—"}</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-6">
            <div className="grid gap-3">
              <div className="flex item-center font-bold">Order Details</div>
              <ul className="grid gap-3">
                {orderDetails?.cartItems && orderDetails.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item) => (
                      <li className="flex items-center justify-between">
                        <span>Title: {item?.title || "—"}</span>
                        <span>Quantity: {item?.quantity || "—"}</span>
                        <span>Price: ${item?.price || "—"}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <div className="flex item-center font-bold">Shipping Info</div>
              <div className="grid gap-1 text-muted-foreground">
                <span>{user.userName}</span>
                <span>{orderDetails?.addressInfo?.address || "—"}</span>
                <span>{orderDetails?.addressInfo?.city || "—"}</span>
                <span>{orderDetails?.addressInfo?.pincode || "—"}</span>
                <span>{orderDetails?.addressInfo?.phone || "—"}</span>
                <span>{orderDetails?.addressInfo?.pincode || "—"}</span>
                <span>{orderDetails?.addressInfo?.notes || "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default ShoppingOrderDetailsView;
