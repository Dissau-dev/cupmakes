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
import { fetchUserByEmail, selectUser } from "../../store/slices/userSlice";

import { AuthenticationParamList, ProfileParamList } from "../../routes/types";
import RenderItemNavList from "../../components/atoms/RenderItemNavList";
import { Baner } from "../../components/atoms/Baner";

//import { AuthContext } from '../../Redux/authContext'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Data = [{}];

interface Props extends StackScreenProps<ProfileParamList, "ProfileScreen"> {}

export const ProfileScreen = ({ navigation }: Props) => {
  const [loading, setloading] = useState(false);
  const [showRegister, setshowRegister] = useState(false);
  const [showLogin, setshowLogin] = useState(true);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useAppSelector(selectUser);

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
      setloading(true);
      //@ts-ignore
      dispatch(fetchUserByEmail(email));
      setloading(false);
    } catch (error) {
      setloading(false);
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
        <Baner />
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontFamily: "Avanta-Medium",
            fontSize: 36,
            marginTop: 40,
            color: "#646464",
          }}
        >
          Hello {currentUser?.first_name} {currentUser?.last_name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 50,
            justifyContent: "space-evenly",
            marginTop: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#646464",
              fontFamily: "Avanta-Medium",
              fontSize: 24,
            }}
          >
            Not {currentUser?.first_name} {currentUser?.last_name} ?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: palette.secondary,
                fontFamily: "Avanta-Medium",
                fontSize: 24,
              }}
            >
              {"Log out "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: height * 0.1 }}>
          <RenderItemNavList
            icon={"basket"}
            text="Orders"
            onPress={() => navigation.navigate("OrdersScreen")}
          />
          <RenderItemNavList
            icon={"home"}
            text="Address"
            onPress={() => navigation.navigate("AddressScreen")}
          />
          <RenderItemNavList
            icon={"account"}
            text="Account-Details"
            onPress={() => navigation.navigate("AccountDetails")}
          />
          <RenderItemNavList
            icon={"folder-heart-outline"}
            text="Wishlist"
            onPress={() => navigation.navigate("WishListScreen")}
          />
          <RenderItemNavList
            icon={"file"}
            text="Compare"
            onPress={() => console.log("s")}
          />
          <RenderItemNavList
            icon={"logout"}
            text="Log out"
            onPress={() => console.log("s")}
          />
        </View>
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

    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#3425ad",
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

    marginVertical: 10,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,

    marginTop: 10,
  },
});
