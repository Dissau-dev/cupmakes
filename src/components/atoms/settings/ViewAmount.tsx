import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, Image } from "react-native";
import TextInputController from "../formControls/TextInputController";
import { stylesSettings } from "../../../theme/styles/SettingStyles";
import { palette } from "../../../theme/colors";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  code: string | number;
  onSetMinAmount: any;
}

export const ViewAmount = ({ code, onSetMinAmount }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      securityPin: "",
      address: `${code}`,
      newSecurityPin: "",
      confirmPin: "",
      newMinAmount: "",
    },
  });
  return (
    <View>
      <View>
        <Text
          style={{ fontSize: 16, fontFamily: "Poppins-Medium", marginLeft: 10 }}
        >
          Monto límite
        </Text>
        <TextInputController
          controller={{
            name: "newMinAmount",
            rules: {
              required: {
                value: true,
                message: "Nuevo monto requerido",
              },
            },
            control: control as any,
          }}
          style={stylesSettings.inputAmount}
          placeholder="50"
          dense
          textColor={palette.secondary}
          autoCapitalize={"none"}
          keyboardType="numeric"
          returnKeyType="next"
          right={<Image source={require("../../../../assets/logo.png")} />}
        />
        <Text
          style={{ fontSize: 16, fontFamily: "Poppins-Medium", marginLeft: 10 }}
        >
          Pin de Seguridad
        </Text>
        <TextInputController
          controller={{
            name: "securityPin",
            control: control as any,
            rules: {
              required: { value: true, message: "Pin de seguridad requerida" },
              minLength: { value: 4, message: "El pin debe tener 4 dígitos" },
              maxLength: { value: 4, message: "La pin debe tener 4 dígitos" },
            },
          }}
          style={stylesSettings.inputAmount}
          placeholder="****"
          dense
          returnKeyType="done"
          keyboardType="numeric"
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
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          marginVertical: 30,
        }}
      >
        <Button
          style={[stylesSettings.btnLogIn]}
          mode="contained"
          buttonColor={palette.primary}
          rippleColor={palette.datesFilter}
          onPress={handleSubmit(onSetMinAmount)}
          textColor={palette.white}
          loading={isSubmitting}
          disabled={(isDirty && !isValid) || isSubmitting}
          labelStyle={stylesSettings.textLogIn}
        >
          Aceptar
        </Button>
      </View>
    </View>
  );
};
