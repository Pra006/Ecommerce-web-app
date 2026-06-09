import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (e) => {
    e.prevntDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>1234</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>24/04/2026</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In progress</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex item-center">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex item-center">Shipping Info</div>
            <div className="grid gap-1 text-muted-foreground">
              <span>John doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone No</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcessing", label: "In Process" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
