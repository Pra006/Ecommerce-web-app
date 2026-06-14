import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../../components/common/form";
import { addressFormControl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAllAddress } from "../../store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";
import { deleteAllAddress } from "../../store/shop/address-slice";
import { editAllAddress } from "../../store/shop/address-slice";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = ({ currentSelectedAddress, setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditAddressId, setCurrentEditAddressId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user?.id ?? user?._id ?? user?.Id ?? user?.ID;
    if (userId) {
      dispatch(fetchAllAddress(userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (
      !currentSelectedAddress &&
      addressList &&
      addressList.length > 0
    ) {
      if (typeof setCurrentSelectedAddress === "function") {
        setCurrentSelectedAddress(addressList[0]);
      }
    }
  }, [addressList, currentSelectedAddress, setCurrentSelectedAddress]);

  const handleAddress = (e) => {
    e.preventDefault();
if (addressList && addressList.length >=3) {
  toast.error(
    "You can only add up to 3 addresses. Please delete an existing address before adding a new one."
  );
  return;
}

    const userId = user?.id ?? user?._id ?? user?.Id ?? user?.ID;
    if (!userId) {
      toast.error("Please login to add an address.");
      return;
    }
    if (currentEditAddressId) {
      dispatch(
        editAllAddress({
          userId,
          addressId: currentEditAddressId,
          formData,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success("Address updated successfully");
          dispatch(fetchAllAddress(userId));
          setFormData(initialFormData);
          setCurrentEditAddressId(null);
        }
      });
    } else {
      dispatch(
        addAddress({
          ...formData,
          userId,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(userId));
          setFormData(initialFormData);
        }
      });
    }
  };
  const isFormValid = () => {
    const { address, city, pincode, phone } = formData;
    return (
      address.trim() !== "" &&
      city.trim() !== "" &&
      pincode.trim() !== "" &&
      phone.trim() !== ""
    );
  };
  const handleDeleteAddress = (addressInfo) => {
    const userId = user?.id ?? user?._id ?? user?.Id ?? user?.ID;
    dispatch(deleteAllAddress({ userId, addressId: addressInfo._id })).then(
      (data) => {
        if (data?.payload?.success) {
          toast.success("Address deleted successfully");
          dispatch(fetchAllAddress(userId));
        }
      },
    );
  };

  const handleEditAddress = (addressInfo) => {
    setCurrentEditAddressId(addressInfo._id);
    setFormData({
      address: addressInfo.address,
      city: addressInfo.city,
      pincode: addressInfo.pincode,
      phone: addressInfo.phone,
      notes: addressInfo.notes,
    });
  };
  return (
    <Card>
      <div className="mb-4 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 md:gap-4 sm:gap-3">
        {addressList && addressList.length > 0 ? (
          addressList.map((addressInfo) => (
            <AddressCard
              selectedId={selectedId}
              currentSelectedAddress={currentSelectedAddress}
              {...(typeof setCurrentSelectedAddress === "function"
                ? { setCurrentSelectedAddress }
                : {})}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              key={addressInfo._id}
              addressInfo={addressInfo}
            />
          ))
        ) : (
          <p>No address found. Please add an address.</p>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditAddressId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControl}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditAddressId ? "Update Address" : "Add Address"}
          onSubmit={handleAddress}
          disabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
