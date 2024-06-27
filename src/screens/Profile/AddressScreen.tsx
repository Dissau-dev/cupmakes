import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";
import { stylesRegister } from "./ProfileScreen";
import { validateEmail } from "../../utils/validation";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { selectUser } from "../../store/slices/userSlice";
import PickerControllerAccAso from "../../components/atoms/formControls/PickerControllerAccAso";

import states from "../../utils/Data";
import PickerController from "../../components/atoms/formControls/PickerController";

export default function AddressScreen() {
  const [modalVisible, setmodalVisible] = useState(true);

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
  });
  const user = useAppSelector(selectUser);
  console.log(user);
  const onSubmit = () => {
    console.log(user);
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
                rules: {
                  required: {
                    value: true,
                    message: "first name required",
                  },
                  validate: { validateEmail },
                },
                control: control as any,
              }}
              style={styles.input}
              dense
              outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
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
                rules: {
                  required: {
                    value: true,
                    message: "last name required",
                  },
                  validate: { validateEmail },
                },
                control: control as any,
              }}
              style={styles.input}
              dense
              outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Company name (optional)</Text>
            <TextInputControllerHolderName
              controller={{
                name: "company",

                control: control as any,
              }}
              style={styles.input}
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Street Address</Text>
            <TextInputControllerHolderName
              controller={{
                name: "state",
                rules: {
                  required: {
                    value: true,
                    message: "State required",
                  },
                  validate: { validateEmail },
                },
                control: control as any,
              }}
              style={styles.input}
              placeholder="House number and street address"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
            <TextInputControllerHolderName
              controller={{
                name: "email",

                control: control as any,
              }}
              style={styles.input}
              placeholder="Apartament, suite, unit, ect. (optional)"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.textInput}>Town/city</Text>
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
              dense
              textColor={palette.secondary}
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
              controller={{ control: control as any, name: "issueEntityId" }}
              label="Select state"
              data={states.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
          </View>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={[styles.textInput, { marginTop: 10 }]}>Zip code</Text>
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
            onPress={handleSubmit(onSubmit)}
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
