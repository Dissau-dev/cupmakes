import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  cleanCart,
  selectFullPrice,
  selectProducts,
} from "../../store/slices/cartSlice";
import { selectUser } from "../../store/slices/userSlice";
import { Controller, useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../store/api/productsApi";
import { Button, TextInput } from "react-native-paper";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import TextInputController from "../atoms/formControls/TextInputController";
import Toast from "react-native-toast-message";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import axios from "axios";
import PaymentScreen from "../PaymentScreen";

export const TakePickUp = () => {
  const [cardDetails, setCardDetails] = useState<any>();
  const [loadingBtn, setloadingBtn] = useState(false);

  const products = useAppSelector(selectProducts);
  const currentUser = useAppSelector(selectUser);
  const [isConfirm, setisConfirm] = useState(false);
  const [delivery, { isLoading }] = useCreateOrderMutation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      name: currentUser?.first_name || "",
      lastName: currentUser?.last_name || "",
      phone: "+1 ",
    },
  });

  const line_Items: { product_id: number; quantity: number }[] = [];
  const fullPrice = useAppSelector(selectFullPrice);
  const formatLineItems = () => {
    products.forEach((i) => {
      line_Items.push({ product_id: i.id, quantity: 1 });
    });

    return line_Items;
  };

  useEffect(() => {
    formatLineItems();
    //console.log(line_Items);
    initialisePaymenSheet();
  }, []);
  const Api_Url = "https://cupmakes.onrender.com/payment-sheet";
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const initialisePaymenSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();
    console.log(
      "payment -" +
        paymentIntent +
        "- ephemeral:" +
        ephemeralKey +
        "- customer" +
        customer
    );
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Example Inc",
      allowsDelayedPaymentMethods: true,
    });
    if (error) {
      Alert.alert(`Error code : ${error.code}`);
    } else {
      setReady(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const data = {
      amount: fullPrice,
    };

    setloadingBtn(true);
    try {
      const response = await axios.post(Api_Url);
      setloadingBtn(false);
      const { paymentIntent, ephemeralKey, customer } = response.data;
      console.log(response.data);

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error);
      setloadingBtn(false);
    }
    const response = await axios.post(Api_Url);
    setloadingBtn(false);
    const { paymentIntent, ephemeralKey, customer } = response.data;
    console.log(response.data);

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  async function onBuy(data: any) {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error("Payment Sheet Error:", error);
        Alert.alert(
          `Error code: ${error.code}, message: ${
            error.message || "Unknown error"
          }, stripeErrorCode: ${error.stripeErrorCode || "N/A"}, declineCode: ${
            error.declineCode || "N/A"
          }`
        );
      } else {
        setReady(false);
        onSubmitDelivery(data);
      }
    } catch (error) {
      console.error("Error presenting PaymentSheet:", error);
      Alert.alert("Error presenting PaymentSheet");
    }
  }

  const onSubmitDelivery = async (data: any) => {
    const orderData = {
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
      set_paid: true,
      billing: {
        first_name: data.name,
        last_name: data.lastName,
        address_1: data.address,
        city: "AnyTown",
        postcode: "12345",
        country: "US",
        email: "correo@ejemplo.com",
        phone: data.phone,
      },
      payment_details: {
        token: "",
      },
      line_items: [
        {
          product_id: 435, // Reemplaza con el ID del producto real
          quantity: 1,
        },
      ],
    };
    //@ts-ignore
    await delivery(orderData)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your order has been received",
        });
        console.log("esta es la loginData:" + orderData);
        //@ts-ignore
        navigation.navigate("SuccessOrder");
      })
      .catch((res: any) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.data}`,
        });
      });
  };

  return (
    <PaymentScreen>
      <View style={{ marginHorizontal: "auto" }}>
        <TextInputController
          controller={{
            name: "name",
            rules: {
              required: {
                value: true,
                message: "name required",
              },
            },
            control: control as any,
          }}
          style={styles.input}
          placeholder="name"
          dense
          //  textColor={palette.se}
          autoCapitalize={"none"}
          returnKeyType="next"
          left={
            <TextInput.Icon
              icon={() => <Fontisto name="person" size={18} color="#c1c1c1" />}
              color={(isTextInputFocused) => "#c1c1c1"}
            />
          }
        />
        <TextInputController
          controller={{
            name: "lastName",
            rules: {
              required: {
                value: true,
                message: "last name required",
              },
            },
            control: control as any,
          }}
          style={styles.input}
          placeholder="last name"
          dense
          //  textColor={palette.se}
          autoCapitalize={"none"}
          returnKeyType="next"
          left={
            <TextInput.Icon
              icon={() => <Fontisto name="person" size={18} color="#c1c1c1" />}
              color={(isTextInputFocused) => "#c1c1c1"}
            />
          }
        />

        <TextInputController
          controller={{
            name: "phone",
            rules: {
              required: {
                value: true,
                message: "phone required",
              },
            },
            control: control as any,
          }}
          style={styles.input}
          placeholder="phone number"
          dense
          //  textColor={palette.se}
          autoCapitalize={"none"}
          returnKeyType="next"
          left={
            <TextInput.Icon
              icon={() => <Fontisto name="phone" size={18} color="#c1c1c1" />}
              color={(isTextInputFocused) => "#c1c1c1"}
            />
          }
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onBuy)}
        loading={isLoading}
        disabled={isLoading || !ready}
      >
        Pagar
      </Button>
    </PaymentScreen>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    //flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 46,
    backgroundColor: palette.white,
    fontSize: 16,
    marginVertical: 10,
  },
  inputPassword: {
    width: 300,
    height: 50,
    backgroundColor: palette.white,

    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
export const stylesRegister = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },

  containerStyle: {
    alignSelf: "center",
    width: widthScreen,
    overflow: "hidden",
    height: widthScreen * 0.6,
    marginBottom: 30,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,

    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#3425ad",
  },

  btnLogIn: {
    marginTop: 20,

    height: heightScrenn * 0.06,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 18,
    alignSelf: "center",
    justifyContent: "center",

    height: heightScrenn * 0.054,
    textAlignVertical: "center",
    width: widthScreen * 0.62,
  },
});
