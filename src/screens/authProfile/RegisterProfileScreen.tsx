import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { loginStyles } from "../../theme/loginTheme";

import { validateEmail } from "../../utils/validation";
import { useForm } from "react-hook-form";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useRegisterCustomerMutation } from "../../store/api/authApi";
import { PostRegister } from "../../store/intefaces";
import Toast from "react-native-toast-message";
import { stylesRegister } from "../authProfile/LoginProfileScreen";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { Button, TextInput } from "react-native-paper";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import {
  AuthProfileParamsList,
  AuthenticationParamList,
  ProfileParamList,
} from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props
  extends StackScreenProps<AuthProfileParamsList, "RegisterProfileScreen"> {}

export const RegisterProfileScreen = ({ navigation }: Props) => {
  const [showPassword, setshowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });
  const [register, { isLoading }] = useRegisterCustomerMutation();

  const onSubmit = async (data: PostRegister) => {
    const loginData = {
      email: data.email,

      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    };

    await register(loginData)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `User register successfully`,
        });
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={stylesRegister.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesRegister.containerStyle}>
          <View style={stylesRegister.sliderContainerStyle}></View>
          <Image
            source={require("../../../assets/images/2.png")}
            style={{
              width: width * 0.98,
              height: height * 0.2,
              justifyContent: "center",
              alignContent: "center",
            }}
          />
        </View>

        <View style={stylesRegister.viewContainer}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 30,
              textAlign: "center",
            }}
          ></Text>
          <View style={stylesRegister.formContainer}>
            <View style={{ marginHorizontal: "auto" }}>
              <Text style={styles.textInput}>Email</Text>
              <TextInputControllerHolderName
                controller={{
                  name: "email",
                  rules: {
                    required: {
                      value: true,
                      message: "email required",
                    },
                    validate: { validateEmail },
                  },
                  control: control as any,
                }}
                style={styles.input}
                placeholder="email@example.com"
                dense
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Fontisto name="email" size={22} color="#c1c1c1" />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                  />
                }
              />
              <Text style={styles.textInput}>First Name</Text>
              <TextInputControllerHolderName
                controller={{
                  name: "first_name",
                  rules: {
                    required: {
                      value: true,
                      message: "name required",
                    },
                  },
                  control: control as any,
                }}
                style={styles.input}
                placeholder="Name"
                dense
                autoCapitalize={"none"}
                returnKeyType="next"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Fontisto name="person" size={22} color="#c1c1c1" />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                  />
                }
              />
              <Text style={styles.textInput}>Last Name</Text>
              <TextInputControllerHolderName
                controller={{
                  name: "last_name",
                  rules: {
                    required: {
                      value: true,
                      message: "last required",
                    },
                  },
                  control: control as any,
                }}
                style={styles.input}
                placeholder="Last name"
                dense
                autoCapitalize={"none"}
                returnKeyType="next"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Fontisto name="person" size={22} color="#c1c1c1" />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                  />
                }
              />
              <Text style={styles.textInput}>Password</Text>
              <TextInputControllerHolderName
                controller={{
                  name: "password",
                  control: control as any,
                  rules: {
                    required: { value: true, message: "password required" },
                  },
                }}
                style={styles.inputPassword}
                placeholder="Password"
                dense
                secureTextEntry={showPassword ? false : true}
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit(onSubmit)()}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color={palette.icons}
                      />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                    onPress={() => setshowPassword(!showPassword)}
                  />
                }
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name={"lock-closed-outline"}
                        size={20}
                        color={palette.icons}
                      />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                    onPress={() => setshowPassword(!showPassword)}
                  />
                }
              />
            </View>

            <Button
              style={[stylesRegister.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              onPress={handleSubmit(onSubmit)}
              textColor={palette.white}
              loading={isSubmitting}
              disabled={(isDirty && !isValid) || isSubmitting || isLoading}
              labelStyle={stylesRegister.textLogIn}
            >
              {isSubmitting ? "Loading" : "Sign up"}
            </Button>

            <View style={loginStyles.newUserContainer}>
              <Text style={{ fontSize: 16, fontFamily: "Avanta-Medium" }}>
                Do you have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("LoginProfileScreen")}
              >
                <Text style={loginStyles.btnRegisterText}>{""} Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  },

  textInput: {
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    color: palette.secondary,
    marginBottom: 4,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,
  },
});
