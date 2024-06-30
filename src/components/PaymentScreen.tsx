import { initStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";

import { palette } from "../theme/colors";
import { fetchPublishableKey } from "../helpers/helper";
import { STRIPE_PUBLISHABLE_KEY } from "../screens/carStore/StripeConfig";

interface Props {
  paymentMethod?: string;
  children: any;
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const publishableKey = STRIPE_PUBLISHABLE_KEY;

      console.log("public" + publishableKey);
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: "merchant.com.stripe.react.native",
          urlScheme: "stripe-example",
        });
        setLoading(false);
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreen;
