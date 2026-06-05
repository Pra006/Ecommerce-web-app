import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Orders from "../../components/shopping-view/orders";
import Address from "../../components/shopping-view/address";
import account3 from "../../assets/account3.jpg";

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={account3}
          alt="Account"
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 mt-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md">
          <Tabs defaultValue=" orders">
            <TabsList className="bg-transparent border-b mb-4 text-muted items-center gap-4 w-full">
              <TabsTrigger value="orders" className="text-lg font-bold">Orders</TabsTrigger>
              <TabsTrigger value="address" className="text-lg font-bold">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
