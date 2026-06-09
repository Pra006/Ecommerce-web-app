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
const AdminOrdersView = () => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
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
            <TableRow>
              <TableCell>1234</TableCell>
              <TableCell>25/03/2026</TableCell>
              <TableCell>In Progress</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailDialog}
                  onOpenChange={setOpenDetailDialog}
                >
                  <Button onClick={()=>setOpenDetailDialog(true)}>View Details</Button>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
