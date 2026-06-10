import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrderByUserId } from "../../store/shop/order-slice";
import { Badge } from "../ui/badge";
import { DialogTrigger } from "../ui/dialog";
import { getOrderDetails } from "../../store/shop/order-slice";
import { resetOrderState } from "../../store/shop/order-slice";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId)).then;
  };
  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    const userId = user?.id ?? user?._id ?? user?.Id ?? user?.ID;
    if (userId) {
      dispatch(getAllOrderByUserId(userId));
    }
  }, [dispatch, user]);
  console.log("orderDetails", orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem._id || orderItem.id}</TableCell>
                    <TableCell>
                      {orderItem.orderdate?.split("T")[0] || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 text-xs ${orderItem.orderStatus === "confirmed" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderState());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleOrderDetails(orderItem?._id || orderItem?.id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
