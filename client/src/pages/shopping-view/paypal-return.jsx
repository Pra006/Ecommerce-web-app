import React, { useDebugValue } from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../store/shop/order-slice";
import { useEffect } from "react";

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
        sessionStorage.removeItem("currentOrderId");
        window.location.href = "/shop/payment-success";
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
