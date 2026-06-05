import React from "react";
import account2 from "../../assets/account2.jpg";
import Address from "../../components/shopping-view/address";

const ShoppingCheckout = () => {
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
      <Address />
      </div>
    </div>
  );
};

export default ShoppingCheckout;
