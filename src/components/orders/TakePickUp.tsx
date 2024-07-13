import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Platform, Text } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { selectFullPrice, selectLineItems } from "../../store/slices/cartSlice";
import { selectUser } from "../../store/slices/userSlice";
import { useForm } from "react-hook-form";
import {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../store/api/productsApi";
import { Button, Dialog, Divider, Portal, TextInput } from "react-native-paper";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import TextInputController from "../atoms/formControls/TextInputController";
import Toast from "react-native-toast-message";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { initStripe, usePaymentSheet } from "@stripe/stripe-react-native";
import axios from "axios";
import PaymentScreen from "../PaymentScreen";
import { STRIPE_PUBLISHABLE_KEY } from "../../screens/carStore/StripeConfig";
import { Address } from "../../store/slices/addressesSlice";
import PickerController from "../atoms/formControls/PickerController";
import states from "../../utils/Data";
import TextInputControllerHolderName from "../atoms/formControls/TextInputControllerHolderName";

interface Props {
  Address: Address;
  isSelected: boolean;
}

export const TakePickUp = ({ Address, isSelected }: Props) => {
  const navigation = useNavigation();

  const currentUser = useAppSelector(selectUser);

  const [delivery, { isLoading, data: createdOrder }] =
    useCreateOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdatading }] =
    useUpdateOrderStatusMutation();

  const theItems = useAppSelector(selectLineItems);
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      firstName: Address?.firstName || "",
      lastName: Address?.lastName || "",
      address: Address ? Address.streetAddress : "",
      townCity: Address ? Address.townCity : "",
      zipCode: Address ? Address.zipCode : "",
      state: "",
      phone: "",
    },
  });

  const [visible, setVisible] = React.useState(false);
  const [modalError, setmodalError] = useState({
    code: "Failed",
    message: "Unkown error",
  });
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const fullPrice = useAppSelector(selectFullPrice);

  useEffect(() => {
    const initializeStripe = async () => {
      await initStripe({
        publishableKey: STRIPE_PUBLISHABLE_KEY,
      });
      await initialisePaymentSheet();
    };

    initializeStripe();
  }, []);
  const API_URL = "https://cupmakes.onrender.com/payment-sheet";
  // const API_URL = "https://expo-stripe-server-example.glitch.me";
  const [ready, setReady] = useState(false);

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const fetchPaymentSheetParams = async () => {
    const data = {
      amount: fullPrice,
    };

    try {
      const response = await axios.post(API_URL, data);

      const { paymentIntent, ephemeralKey, customer } = response.data;
      console.log(response.data);

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error);
    }
    const response = await axios.post(API_URL, data);

    const { paymentIntent, ephemeralKey, customer } = response.data;
    console.log(response.data);

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initialisePaymentSheet = async () => {
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

        return;
      }

      setReady(true);
    } catch (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Unable to initialize payment sheet.");
    }
  };

  async function onBuy(responseId: any) {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        showDialog();

        return;
      } else {
        const updateData = {
          status: "completed",
        };
        //@ts-ignore
        await updateOrderStatus({ id: responseId, data: updateData }).unwrap();

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your order has been received",
        });

        //@ts-ignore
        navigation.navigate("SuccessOrder");
        setReady(false);
      }
    } catch (error) {
      console.error("Error presenting PaymentSheet:", error);
      Alert.alert("Error presenting PaymentSheet");
    }
  }

  const onSubmitDelivery = async (data: any) => {
    const orderData = {
      total: fullPrice.toString(),
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
      set_paid: true,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        state: Address && isSelected ? Address.state : data.state,
        address_1: Address ? Address.streetAddress : data.address,
        city: Address ? Address.townCity : data.townCity,
        postcode: Address ? Address.zipCode : "",
        country: "US",
        email: currentUser?.email,
        phone: data.phone,
      },
      customer_id: currentUser?.id, // Reemplazar con el ID del cliente real
      // Agregar saldo total como metadatos
      meta_data: [
        {
          key: "total_balance",
          value: fullPrice, // Reemplazar con el saldo total real
        },
      ],

      line_items: theItems,
    };

    try {
      //@ts-ignore
      const response = await delivery(orderData).unwrap();
      //@ts-ignore

      const responseId = response.id;
      await onBuy(responseId);
    } catch (res: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `${res.data}`,
      });
      return;
    }
  };

  return (
    <>
      <PaymentScreen>
        <View style={{ marginHorizontal: "auto" }}>
          <TextInputControllerHolderName
            controller={{
              name: "firstName",
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
          />
          <TextInputControllerHolderName
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
          />

          <TextInputControllerHolderName
            controller={{
              name: "address",
              rules: {
                required: {
                  value: true,
                  message: "Address required",
                },
              },
              control: control as any,
            }}
            style={styles.input}
            placeholder="Address"
            dense
            //  textColor={palette.se}
            autoCapitalize={"none"}
            returnKeyType="next"
          />
          <TextInputControllerHolderName
            controller={{
              name: "townCity",
              rules: {
                required: {
                  value: true,
                  message: "City required",
                },
              },
              control: control as any,
            }}
            style={styles.input}
            placeholder="town/City"
            dense
            //  textColor={palette.se}
            autoCapitalize={"none"}
            returnKeyType="next"
          />
          {!isSelected && (
            <PickerController
              controller={{ control: control as any, name: "state" }}
              label="Select state"
              data={states.map((item) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              })}
            />
          )}

          <TextInputControllerHolderName
            controller={{
              name: "phone",

              control: control as any,
            }}
            style={styles.input}
            placeholder="phone number (optional)"
            dense
            //  textColor={palette.se}
            autoCapitalize={"none"}
            returnKeyType="next"
          />
        </View>

        <Button
          style={[styles.btnLogIn]}
          mode="contained"
          buttonColor={palette.primary}
          rippleColor={palette.datesFilter}
          onPress={handleSubmit(onSubmitDelivery)}
          textColor={palette.white}
          loading={isLoading}
          disabled={isLoading || !ready}
          labelStyle={styles.textLogIn}
        >
          {isSubmitting ? "Loading" : "Confirm"}
        </Button>
        <Portal>
          <Dialog
            style={{ backgroundColor: "#fff" }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Payment Error</Dialog.Title>
            <Divider />
            <Dialog.Content>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Avanta-Medium",
                  marginTop: 20,
                }}
              >{`${modalError.code},   ${
                modalError.message || "Unknown error"
              }`}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={hideDialog}
                rippleColor={"#c1c1c1"}
                labelStyle={{
                  color: palette.secondary,
                  fontFamily: "Avanta-Medium",
                  fontSize: 22,
                }}
              >
                OK
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaymentScreen>
    </>
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
    marginVertical: 6,
    alignSelf: "center",
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
  btnLogIn: {
    marginTop: 20,

    height: heightScrenn * 0.06,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: widthScreen * 0.8,
    alignSelf: "center",
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 24,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Avanta-Medium",
    height: heightScrenn * 0.054,
    textAlignVertical: "center",
    width: widthScreen * 0.68,
  },
});
