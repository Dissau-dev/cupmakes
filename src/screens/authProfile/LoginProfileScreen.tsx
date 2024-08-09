import React, { useContext, useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  ToastAndroid,
  Dimensions,
  Pressable,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import { StackScreenProps } from "@react-navigation/stack";

import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";

import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { validateEmail } from "../../utils/validation";
import { loginStyles } from "../../theme/loginTheme";
import { useGetUserByEmailQuery } from "../../store/api/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUserByEmail, selectStatus } from "../../store/slices/userSlice";

import {
  AuthProfileParamsList,
  AuthenticationParamList,
  ProfileParamList,
} from "../../routes/types";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";

//import { AuthContext } from '../../Redux/authContext'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props
  extends StackScreenProps<AuthProfileParamsList, "LoginProfileScreen"> {}

export const LoginProfileScreen = ({ navigation }: Props) => {
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: any) => {
    const email = data.email;
    console.log(email);
    try {
      //@ts-ignore
      dispatch(fetchUserByEmail(email));
    } catch (error) {
      console.log("error :" + error);
    }
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
            </View>

            <Button
              style={[stylesRegister.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              onPress={handleSubmit(onSubmit)}
              textColor={palette.white}
              loading={status === "loading"}
              disabled={status === "loading"}
              labelStyle={stylesRegister.textLogIn}
            >
              {isSubmitting ? "Loading" : "Log in"}
            </Button>

            <View style={loginStyles.newUserContainer}>
              <Text style={{ fontSize: 16, fontFamily: "Avanta-Medium" }}>
                You do not have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("RegisterProfileScreen")}
              >
                <Text style={loginStyles.btnRegisterText}>{""} Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const stylesRegister = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  containerStyle: {
    alignSelf: "center",
    width: width,
    overflow: "hidden",
    height: width * 0.6,
    marginBottom: 30,
  },
  sliderContainerStyle: {
    backgroundColor: palette.primary,
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    // marginLeft: -(width / 2),
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  logo: {
    width: "30%",
    height: "30%",
    marginTop: 350,
    alignSelf: "center",
    // backgroundColor: "pink",
  },

  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },

  formContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  btnLogIn: {
    marginTop: 20,

    height: height * 0.06,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 20,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Avanta-Medium",
    height: height * 0.05,
    textAlignVertical: "center",
    width: width * 0.62,
  },
});
const styles = StyleSheet.create({
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
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

  textInput: {
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    color: palette.secondary,
  },
});
