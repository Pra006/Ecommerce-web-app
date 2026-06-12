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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrderForAdmin, resetOrderState } from "../../store/admin/order-slice";
import { getOrderDetailsForAdmin } from "../../store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId)).then(() => {
      setOpenDetailDialog(true);
    });
  };

  useEffect(() => {
    dispatch(getAllOrderForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailDialog(true);
  }, [orderDetails]);

  console.log("orderDetails", orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem._id || orderItem.id}</TableCell>
                    <TableCell>
                      {orderItem.orderdate?.split("T")[0] || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                          className={`px-2 py-1 text-xs ${orderItem?.orderStatus === "delivered" ? "bg-green-500":
                  orderItem?.orderStatus === "rejected" ?"bg-red-500" :  orderItem?.orderStatus === "Shipping" ? "bg-amber-500" : orderItem?.orderStatus === "pending" ? "bg-yellow-400"
                  : "bg-black-500"}`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                      open={openDetailDialog}
                      onOpenChange={() => {
                        setOpenDetailDialog(false);
                        dispatch(resetOrderState());
                      }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(
                              orderItem?._id || orderItem?.id,
                            )
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableHeader>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
