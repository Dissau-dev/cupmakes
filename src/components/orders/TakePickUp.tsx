import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cleanCart, selectProducts } from "../../store/slices/cartSlice";
import { selectUser } from "../../store/slices/userSlice";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../store/api/productsApi";
import { Button, TextInput } from "react-native-paper";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import TextInputController from "../atoms/formControls/TextInputController";
import Toast from "react-native-toast-message";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const TakePickUp = () => {
  const products = useAppSelector(selectProducts);
  const currentUser = useAppSelector(selectUser);
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
      address_1: "",
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
  }, []);

  const onSubmitDelivery = async (data: any) => {
    const loginData = {
      customer_id: currentUser?.id, // Reemplaza esto con el ID del cliente
      payment_method: "stripe", // Reemplaza con tu método de pago deseado
      payment_method_title: "Stripe", // Reemplaza con el título del método de pago
      set_paid: true,
      billing: {
        first_name: data.name,
        last_name: data.lastName,
        address_1: data.address_1,
        city: "AnyTown",
        postcode: "12345",
        country: "US",
        email: currentUser?.email,
        phone: data.phone,
      },
      line_items: line_Items,
    };
    //@ts-ignore
    await delivery(loginData)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `Your order has been received`,
        });

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
    <View>
      <View style={stylesRegister.formContainer}>
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
          {/*   <TextInputController
            controller={{
              name: "address_1",
              rules: {
                required: {
                  value: true,
                  message: " address required",
                },
              },
              control: control as any,
            }}
            style={styles.input}
            placeholder="adress"
            dense
            //  textColor={palette.secondary}
            autoCapitalize={"none"}
            returnKeyType="next"
            left={
              <TextInput.Icon
                icon={() => <Fontisto name="home" size={18} color="#c1c1c1" />}
                color={(isTextInputFocused) => "#c1c1c1"}
              />
            }
          /> */}
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
          style={[stylesRegister.btnLogIn]}
          mode="contained"
          buttonColor={palette.primary}
          rippleColor={palette.datesFilter}
          onPress={handleSubmit(onSubmitDelivery)}
          textColor={palette.white}
          loading={isSubmitting}
          disabled={(isDirty && !isValid) || isSubmitting || isLoading}
          labelStyle={stylesRegister.textLogIn}
        >
          {isSubmitting ? "Confirming" : "Confirm"}
        </Button>
      </View>
    </View>
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

  formContainer: {
    // flex: 1,
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
