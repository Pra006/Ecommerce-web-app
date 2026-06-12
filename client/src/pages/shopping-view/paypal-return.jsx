import React from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../store/shop/order-slice";
import { useEffect } from "react";
import { toast } from "sonner";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  
  useEffect(() => {
    if (paymentId && payerId){
      const getCurrentOrderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({
        paymentId,
        payerId,
        orderId: getCurrentOrderId
      })).then(data => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          toast.error(data?.payload?.message || "Payment capture failed");
        }
      })
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paypal Return Page.</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
