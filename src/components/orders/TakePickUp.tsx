import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cleanCart, selectProducts } from "../../store/slices/cartSlice";
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
import {
  CardField,
  StripeProvider,
  Token,
  initPaymentSheet,
  usePaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "axios";
import AccounDetail from "../../screens/Profile/AccounDetail";
import { STRIPE_PUBLISHABLE_KEY } from "../../screens/carStore/StripeConfig";

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

  const { createToken } = useStripe();

  const initialisePaymenSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

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

      console.log("No hay error en InitPaymentSheet");
    }
  };

  const fetchPaymentSheetParams = async () => {
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

  const customAppearance = {
    font: {
      family:
        Platform.OS === "android" ? "avenirnextregular" : "AvenirNext-Regular",
    },
    shapes: {
      borderRadius: 12,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
        borderRadius: 20,
      },
    },
    colors: {
      primary: "#fcfdff",
      background: "#ffffff",
      componentBackground: "#f3f8fa",
      componentBorder: "#f3f8fa",
      componentDivider: "#000000",
      primaryText: "#000000",
      secondaryText: "#000000",
      componentText: "#000000",
      placeholderText: "#73757b",
    },
  };

  async function onBuy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("Payment Sheet Error: ", error);
      Alert.alert(
        `Error code : ${error.code}, message: ${
          error.message || "Unknown error"
        }, stripeErrorCode: ${error.stripeErrorCode || "N/A"}, declineCode: ${
          error.declineCode || "N/A"
        }`
      );
    } else {
      Alert.alert("Success, the payment has been completed");
      setReady(false);
    }
  }

  const _createToken = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Please enter complete card details");
      return;
    }

    const billingDetails = { email: "mauriciogaraco@gmail.com" }; // Opcional
    const { error, token } = await createToken({
      type: "Card",
      name: "David Wallace",
      currency: "eur",
    });

    if (error) {
      Alert.alert(
        `Error code: ${error.code}`,
        error.message || "An unknown error occurred"
      );
      console.log(`Error: ${JSON.stringify(error)}`);
    } else {
      console.log(token);
      Alert.alert("Success", `The token was created successfully! token: `);
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await axios.post(
        "https://api.stripe.com/v1/payment_intents",
        new URLSearchParams({
          amount: "1099",
          currency: "usd",
        }).toString(),
        {
          headers: {
            //   Authorization: `Bearer ${secretCase}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("esta es la resp.data :" + response.data);
      return response.data.client_secret;
    } catch (error) {
      console.log("aqui es el error :" + error);
      return;
    }
  };

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
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
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
                icon={() => (
                  <Fontisto name="person" size={18} color="#c1c1c1" />
                )}
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
                icon={() => (
                  <Fontisto name="person" size={18} color="#c1c1c1" />
                )}
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
        {/*   <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      /> */}

        <Button
          rippleColor={"#c1c1c1"}
          mode="contained"
          // loading={loadingBtn}
          // disabled={loadingBtn}
          onPress={onBuy}
          //  loading={isLoading || loading}
          disabled={isLoading || loading || !ready}
        >
          Pagar
        </Button>
      </View>
    </StripeProvider>
  );
};

function buildTestTokenParams(type: Token.Type): Token.CreateParams {
  switch (type) {
    case "Pii":
      return {
        type: "Pii",
        personalId: "000000000",
      };
    case "Card":
      return {
        type: "Card",
        name: "David Wallace",
        currency: "eur",
      };
    case "BankAccount":
      return {
        type: "BankAccount",
        accountNumber: "000123456789",
        routingNumber: "110000000", // Routing number is REQUIRED for US bank accounts
        country: "US",
        currency: "usd",
      };
    default:
      throw new Error(`Unsupported token type`);
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
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
