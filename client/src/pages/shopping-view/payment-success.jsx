import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-xl rounded-2xl">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </div>

          <CardTitle className="text-2xl font-semibold text-green-600">
            Payment Successful
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 py-4">
          <p className="text-gray-600 text-sm">
            Thank you for your purchase! 🎉
            <br />
            Your order has been placed successfully.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => navigate("/shop/account")}
              className="w-full"
            >
              View My Orders
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/shop/home")}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;