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
