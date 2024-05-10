import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { palette } from "../../../theme/colors";
import { useForm } from "react-hook-form";
import TextInputController from "../formControls/TextInputController";
import { validateAmount } from "../../../utils/validation";
import { stylesSettings } from "../../../theme/styles/SettingStyles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  code: string | number;
  onSetPin: any;
}

export const ViewAccountPin = ({ code, onSetPin }: Props) => {
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
          Nuevo pin de seguridad
        </Text>
        <TextInputController
          controller={{
            name: "securityPin",
            control: control as any,
            rules: {
              required: { value: true, message: "Nuevo pin requerido" },
              validate: { validateAmount },
            },
          }}
          style={stylesSettings.inputAmount}
          placeholder="****"
          dense
          textColor={palette.secondary}
          autoCapitalize={"none"}
          keyboardType="numeric"
          returnKeyType="next"
        />
        <Text
          style={{ fontSize: 16, fontFamily: "Poppins-Medium", marginLeft: 10 }}
        >
          Confirmar pin
        </Text>
        <TextInputController
          controller={{
            name: "confirmPin",
            control: control as any,
            rules: {
              required: { value: true, message: "Confirmar pin" },
              minLength: { value: 4, message: "El pin debe tener 4 dígitos" },
              maxLength: { value: 4, message: "La pin debe tener 4 dígitos" },
              validate: { validateAmount },
            },
          }}
          style={stylesSettings.inputAmount}
          placeholder="****"
          dense
          keyboardType="numeric"
          returnKeyType="next"
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
          onPress={handleSubmit(onSetPin)}
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
