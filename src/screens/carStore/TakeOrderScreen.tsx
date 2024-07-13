/* import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  StripeProvider,
  initStripe,
  useStripe,
} from "@stripe/stripe-react-native";
import PaymentScreen from "../../components/PaymentScreen";
import Button from "../../components/Button";
import { palette } from "../../theme/colors";
import { STRIPE_PUBLISHABLE_KEY } from "./StripeConfig";

const API_URL = "https://expo-stripe-server-example.glitch.me";
//const API_URL = "https://cupmakes.onrender.com";
const PUBLISHABLE_KEY = STRIPE_PUBLISHABLE_KEY;

export const TakeOrderScreen = () => {
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<{
    image: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    // Inicializar Stripe con la clave publicable
    const initializeStripe = async () => {
      await initStripe({
        publishableKey: PUBLISHABLE_KEY,
      });
      await initialisePaymentSheet();
    };

    initializeStripe();
  }, []);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error, paymentOption } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "Example Inc.",
        applePay: true,
        merchantCountryCode: "US",
        style: "alwaysDark",
        googlePay: true,
        testEnv: true,
      });

      if (error) {
        console.error("Error initializing payment sheet:", error);
        Alert.alert("Error", error.message);
        setLoading(false);
        return;
      }

      setPaymentSheetEnabled(true);
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Unable to initialize payment sheet.");
    } finally {
      setLoading(false);
    }
  };

  const choosePaymentOption = async () => {
    if (!paymentSheetEnabled) {
      Alert.alert("Error", "Payment sheet not initialized");
      return;
    }

    try {
      const { error, paymentOption } = await presentPaymentSheet({
        confirmPayment: false,
      });

      if (error) {
        console.error("Error presenting payment sheet:", error);
        Alert.alert(
          "Error",
          error.message ||
            "An unknown error occurred while presenting the payment sheet."
        );
      } else if (paymentOption) {
        setPaymentMethod({
          label: paymentOption.label,
          image: paymentOption.image,
        });
      } else {
        setPaymentMethod(null);
      }
    } catch (error) {
      console.error("Error presenting payment sheet:", error);
      Alert.alert("Error", "Unable to present payment sheet.");
    }
  };

  const onPressBuy = async () => {
    setLoading(true);
    try {
      const { error } = await confirmPaymentSheetPayment();s

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert("Success", "The payment was confirmed successfully!");
        setPaymentSheetEnabled(false);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      Alert.alert("Error", "Unable to confirm payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentScreen>
      <View>
        <Button
          variant="primary"
          loading={loading}
          title={
            paymentMethod ? (
              <View style={styles.row}>
                <Image
                  source={{
                    uri: `data:image/png;base64,${paymentMethod.image}`,
                  }}
                  style={styles.image}
                />
                <Text style={styles.text}>{paymentMethod.label}</Text>
              </View>
            ) : (
              "Choose payment method"
            )
          }
          disabled={!paymentSheetEnabled}
          onPress={choosePaymentOption}
        />
      </View>

      <View style={styles.section}>
        <Button
          variant="primary"
          loading={loading}
          disabled={!paymentMethod || !paymentSheetEnabled}
          title="Buy"
          onPress={onPressBuy}
        />
      </View>
    </PaymentScreen>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  paymentMethodTitle: {
    color: palette.secondary,
    fontWeight: "bold",
  },
  image: {
    width: 26,
    height: 20,
  },
  text: {
    color: palette.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
}); */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { SegmentedButtons, TextInput, Button } from "react-native-paper";
import { validateEmail } from "../../utils/validation";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useCreateOrderMutation } from "../../store/api/productsApi";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/userSlice";
import { selectLineItems, selectProducts } from "../../store/slices/cartSlice";
import { TakeDelivery } from "../../components/orders/TakeDelivery";
import { TakePickUp } from "../../components/orders/TakePickUp";
import { BarLoading } from "../../components/atoms/Products/cart/BarLoading";
import { StackScreenProps } from "@react-navigation/stack";
import { CarParamList } from "../../routes/types";
import AddAddress from "../Profile/AddAddress";

interface Props extends StackScreenProps<CarParamList, "TakeOrderScreen"> {}

export const TakeOrderScreen = ({ route }: Props) => {
  const { isSelected, Address } = route.params;
  const [value, setValue] = useState<"DELIVERY" | "PICKUP">(
    Address ? Address.type : "DELIVERY"
  );

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <BarLoading level={2} />
        {!isSelected && (
          <SegmentedButtons
            value={value}
            style={{
              marginTop: heightScrenn * 0.03,
              width: widthScreen * 0.9,
              alignSelf: "center",
            }}
            //@ts-ignore
            onValueChange={setValue}
            buttons={[
              {
                value: "DELIVERY",
                label: "Delivery",
                checkedColor: palette.white,
                style: {
                  backgroundColor:
                    value === "DELIVERY" ? palette.primary : palette.white,
                },
                showSelectedCheck: true,
              },
              {
                value: "PICKUP",
                label: "Pick up",
                checkedColor: palette.white,
                style: {
                  backgroundColor:
                    value === "PICKUP" ? palette.primary : palette.white,
                },
                showSelectedCheck: true,
              },
            ]}
          />
        )}

        {value === "DELIVERY" ? (
          <TakeDelivery Address={Address} isSelected={isSelected} />
        ) : (
          <TakePickUp Address={Address} isSelected={isSelected} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
