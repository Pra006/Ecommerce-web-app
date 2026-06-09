import paypal from "paypal-rest-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const mode = process.env.PAYPAL_MODE ?? "sandbox";

if (!clientId || !clientSecret) {
  console.warn(
    "Missing PayPal credentials. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your .env file.",
  );
}

paypal.configure({
  mode,
  client_id: clientId,
  client_secret: clientSecret,
});

export default paypal;