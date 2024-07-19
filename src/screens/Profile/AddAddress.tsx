import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";
import { stylesRegister } from "./ProfileScreen";
import { validateEmail } from "../../utils/validation";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { selectUser } from "../../store/slices/userSlice";

import states from "../../utils/Data";
import PickerController from "../../components/atoms/formControls/PickerController";
import {
  Address,
  addAddress,
  updateAddress,
} from "../../store/slices/addressesSlice";
import { ProfileParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import uuid from "react-native-uuid";

import Toast from "react-native-toast-message";

interface Props extends StackScreenProps<ProfileParamList, "AddAddress"> {}

export default function AddAddress({ navigation, route }: Props) {
  const [modalVisible, setmodalVisible] = useState(true);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const {
    type,
    isEditing,
    id,
    firstName,
    apartmentSuiteUnitEtc,
    companyName,
    lastName,
    state,
    streetAddress,
    townCity,
    zipCode,
  } = route.params;
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      firstName: isEditing ? firstName : "",
      lastName: isEditing ? lastName : "",
      companyName: isEditing ? companyName : "",
      streetAddress: isEditing ? streetAddress : "",
      type: type,
      apartmentSuiteUnitEtc: isEditing ? apartmentSuiteUnitEtc : "",
      townCity: isEditing ? townCity : "",
      state: isEditing ? state : "",
      zipCode: isEditing ? zipCode : "",
    },
  });

  const onSubmit = (data: Address) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const companyName = data.companyName;
    const streetAddress = data.streetAddress;
    const type = data.type;
    const apartmentSuiteUnitEtc = data.apartmentSuiteUnitEtc;
    const townCity = data.townCity;
    const state = data.state;
    const zipCode = data.zipCode;
    const country = "United States";
    dispatch(
      addAddress({
        id: uuid.v4().toString(),
        firstName,
        lastName,
        companyName,
        country,
        streetAddress,
        state,
        townCity,
        type,
        zipCode,
        apartmentSuiteUnitEtc,
      })
    );
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Your address has been received",
    });
    navigation.goBack();
  };
  const onEdit = (data: Address) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const companyName = data.companyName;
    const streetAddress = data.streetAddress;
    const type = data.type;
    const apartmentSuiteUnitEtc = data.apartmentSuiteUnitEtc;
    const townCity = data.townCity;
    const state = data.state;
    const zipCode = data.zipCode;
    const country = "United States";
    dispatch(
      updateAddress({
        id: id,
        address: {
          id: id,
          firstName,
          lastName,
          companyName,
          country,
          streetAddress,
          state,
          townCity,
          type,
          zipCode,
          apartmentSuiteUnitEtc,
        },
      })
    );
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "your address has been updated",
    });
    navigation.goBack();
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
                name: "firstName",
                rules: {
                  required: {
                    value: true,
                    message: "first name required",
                  },
                },
                control: control as any,
              }}
              placeholder="first name"
              style={styles.input}
              dense
              outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
              autoCapitalize={"none"}
              returnKeyType="next"
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Last name</Text>
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
              placeholder="last name"
              style={styles.input}
              dense
              outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
              autoCapitalize={"none"}
              returnKeyType="next"
            />
          </View>
          {type === "DELIVERY" && (
            <View style={{ marginHorizontal: "auto" }}>
              <Text style={styles.textInput}>Company name (optional)</Text>
              <TextInputControllerHolderName
                controller={{
                  name: "companyName",

                  control: control as any,
                }}
                style={styles.input}
                dense
                placeholder="company name"
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
          )}

          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Street Address</Text>
            <TextInputControllerHolderName
              controller={{
                name: "streetAddress",
                rules: {
                  required: {
                    value: true,
                    message: "State required",
                  },
                },
                control: control as any,
              }}
              style={styles.input}
              placeholder="House number and street address"
              dense
              autoCapitalize={"none"}
              returnKeyType="next"
            />
            <TextInputControllerHolderName
              controller={{
                name: "apartmentSuiteUnitEtc",

                control: control as any,
              }}
              style={styles.input}
              placeholder="Apartament, suite, unit, ect. (optional)"
              dense
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Town/city</Text>
            <TextInputControllerHolderName
              controller={{
                name: "townCity",
                rules: {
                  required: {
                    value: true,
                    message: "city required",
                  },
                },
                control: control as any,
              }}
              placeholder="town/city"
              style={styles.input}
              dense
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View
            style={{
              marginHorizontal: "auto",
              width: widthScreen * 0.78,
            }}
          >
            <Text style={[styles.textInput, { marginBottom: 10 }]}>State</Text>

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
          </View>
          {type === "DELIVERY" && (
            <View style={{ marginHorizontal: "auto" }}>
              <Text style={[styles.textInput, { marginTop: 10 }]}>
                Zip code
              </Text>
              <TextInputControllerHolderName
                controller={{
                  name: "zipCode",
                  rules: {
                    required: {
                      value: true,
                      message: "post code required",
                    },
                  },
                  control: control as any,
                }}
                style={styles.input}
                dense
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder=" post code"
              />
            </View>
          )}

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
            //@ts-ignore
            onPress={isEditing ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
            textColor={palette.white}
            loading={isSubmitting}
            disabled={(isDirty && !isValid) || isSubmitting}
            labelStyle={[stylesRegister.textLogIn, { fontSize: 22 }]}
          >
            {isSubmitting ? "Loading" : "Save address"}
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
