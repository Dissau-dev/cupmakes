/*import React, { useEffect, useState } from "react";
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

  console.log(paymentMethod);
  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error, paymentOption } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "Cupmakes",

        style: "alwaysDark",
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
      const { error, paymentOption } = await presentPaymentSheet(z);

      console.log(paymentOption);
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
      const { error } = await confirmPaymentSheetPayment();

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

 
};

*/
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

export const TakeOrderScreen = () => {
  const [value, setValue] = useState("delivery");
  const [delivery, { isLoading }] = useCreateOrderMutation();

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      address_1: "",
      phone: "d",
    },
  });
  const products = useAppSelector(selectProducts);
  const currentUser = useAppSelector(selectUser);
  const line_Items: { product_id: number; quantity: number }[] = [];

  const formatLineItems = () => {
    products.forEach((i) => {
      line_Items.push({ product_id: i.id, quantity: 1 });
    });

    return line_Items;
  };

  useEffect(() => {
    formatLineItems();
    console.log(line_Items);
  }, []);

  const onSubmitDelivery = async (data: any) => {
    const loginData = {
      customer_id: currentUser?.id, // Reemplaza esto con el ID del cliente
      billing: {
        // first_name: data.customer_name,
        first_name: "Test ",
        last_name: "mauricio",
        address_1: data.address_1,
        city: "Tampa",
        state: "Florida",
        postcode: "20212",
        country: "USA",
        email: "mauriciogaraco@gmail.com",
        phone: data.phone,
      },
      shipping: {
        first_name: "test", //data.customer_name,
        last_name: "mauricio",
        address_1: data.address_1, // data.customer_address,
        city: "tampa",
        state: "Florida",
        postcode: "20212",
        country: "USA",
      },
      payment_method: "bacs", // Reemplaza esto con el método de pago deseado
      payment_method_title: "Transferencia bancaria directa",
      line_items: line_Items,
    };
    //@ts-ignore
    await delivery(loginData)
      .unwrap()
      .catch((res: any) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.data}`,
        });
      });
  };

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
        <SegmentedButtons
          value={value}
          style={{
            marginTop: heightScrenn * 0.05,
            width: widthScreen * 0.9,
            alignSelf: "center",
          }}
          onValueChange={setValue}
          buttons={[
            {
              value: "delivery",
              label: "Delivery",
              checkedColor: palette.white,
              style: {
                backgroundColor:
                  value === "delivery" ? palette.primary : palette.white,
              },
              showSelectedCheck: true,
            },
            {
              value: "pickUp",
              label: "Pick up",
              checkedColor: palette.white,
              style: {
                backgroundColor:
                  value === "pickUp" ? palette.primary : palette.white,
              },
              showSelectedCheck: true,
            },
          ]}
        />
        {value === "delivery" ? <TakeDelivery /> : <TakePickUp />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
