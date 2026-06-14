import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePayment } from "../../store/shop/order-slice";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("processing"); 
  // processing | success | failed

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    const capture = async () => {
      if (!paymentId || !payerId) {
        setStatus("failed");
        return;
      }

      try {
        const getCurrentOrderId = JSON.parse(
          sessionStorage.getItem("currentOrderId")
        );

        const data = await dispatch(
          capturePayment({
            paymentId,
            payerId,
            orderId: getCurrentOrderId,
          })
        );

        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          setStatus("success");

          setTimeout(() => {
            navigate("/shop/payment-success");
          }, 1500);
        } else {
          setStatus("failed");
          toast.error(data?.payload?.message || "Payment capture failed");
        }
      } catch (error) {
        setStatus("failed");
        toast.error("Something went wrong");
      }
    };

    capture();
  }, [paymentId, payerId, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            PayPal Payment
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 py-8">
          {status === "processing" && (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              <p className="text-gray-600">Processing your payment...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-green-600 font-medium">
                Payment successful!
              </p>
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-red-600 font-medium">
                Payment failed or cancelled
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaypalReturnPage;