// StripeConfig.js
import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX";

const StripeConfig = ({ children }: any) => (
  <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
    {children}
  </StripeProvider>
);

export default StripeConfig;
