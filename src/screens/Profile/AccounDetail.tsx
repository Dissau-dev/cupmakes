import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import { stylesRegister } from "./ProfileScreen";
import { validateEmail } from "../../utils/validation";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, updateUser } from "../../store/slices/userSlice";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { useUpdateCustomerMutation } from "../../store/api/productsApi";
import Toast from "react-native-toast-message";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileParamList } from "../../routes/types";

interface Props extends StackScreenProps<ProfileParamList, "AccountDetails"> {}

export default function AccounDetail({ navigation }: Props) {
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const handleUpdateCustomer = async (data: any) => {
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;
    let datosActualizados = {
      first_name: data.first_name || user?.first_name,
      last_name: data.last_name || user?.last_name,
      email: data.email || user?.email,
    };

    if (newPassword && newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "The passwords do not match",
      });
      return;
    }

    if (newPassword && newPassword == !"") {
      data = { ...data, password: newPassword };
    }
    const editData = {
      customerId: 4,
      data: datosActualizados,
    };

    const resultado = await updateCustomer(editData)
      .unwrap()
      .then(() => {
        const newUser = datosActualizados;
        dispatch(updateUser(newUser));
        console.log("resultado" + resultado);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Change updates succesfully",
        });
        navigation.goBack();
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
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesRegister.formContainer}>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>First name</Text>
            <TextInputControllerHolderName
              controller={{
                name: "first_name",

                control: control as any,
              }}
              style={styles.input}
              placeholder="First name"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Last name</Text>
            <TextInputControllerHolderName
              controller={{
                name: "last_name",

                control: control as any,
              }}
              style={styles.input}
              placeholder="Last name"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Email address</Text>
            <TextInputControllerHolderName
              controller={{
                name: "email",

                control: control as any,
              }}
              style={styles.input}
              placeholder="email@example.com"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View
            style={{
              borderWidth: 1,

              marginTop: 20,
              borderRadius: 10,
              padding: 20,
              borderColor: "#c1c1c1",
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: heightScrenn * 0.49,
                marginLeft: 18,
                backgroundColor: palette.white,
                padding: 6,
                borderRadius: 100,
              }}
            >
              <Text style={[styles.textInput, { fontSize: 23 }]}>
                Password change
              </Text>
            </View>
            <View style={{ marginBottom: 20 }} />
            <Text style={styles.textInput}>
              Current password (leave blank to leave unchanged)
            </Text>
            <TextInputControllerHolderName
              controller={{
                name: "currentPassword",

                control: control as any,
              }}
              style={styles.input}
              placeholder="your password"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Text style={styles.textInput}>
              New password (leave blank to leave unchanged)
            </Text>
            <TextInputControllerHolderName
              controller={{
                name: "newPassword",

                control: control as any,
              }}
              style={styles.input}
              placeholder="new password"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Text style={styles.textInput}>Confirm new password</Text>
            <TextInputControllerHolderName
              controller={{
                name: "confirmPassword",

                control: control as any,
              }}
              style={styles.input}
              placeholder="confirm password"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          <View style={{ marginBottom: heightScrenn * 0.2 }} />
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            style={[stylesRegister.btnLogIn]}
            mode="contained"
            buttonColor={palette.secondary}
            rippleColor={palette.datesFilter}
            onPress={handleSubmit(handleUpdateCustomer)}
            textColor={palette.white}
            loading={isSubmitting}
            disabled={!isDirty || isSubmitting}
            labelStyle={[stylesRegister.textLogIn, { fontSize: 22 }]}
          >
            {isSubmitting ? "Loading" : "Save changes"}
          </Button>
        </View>
      </View>
    </View>
  );
}

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
    height: 45,
    backgroundColor: palette.white,
    alignSelf: "center",
    marginVertical: 6,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,

    marginTop: 10,
  },
  textInput: {
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    color: palette.secondary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 2,

    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 16,
    position: "absolute",
    bottom: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: widthScreen,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
