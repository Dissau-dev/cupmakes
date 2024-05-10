import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { palette } from "../../../theme/colors";

type ControlProps = Omit<ControllerProps, "render">;

interface TextInputControllerProps extends TextInputProps {
  controller: ControlProps;
}

export default function TextInputController(props: TextInputControllerProps) {
  const {
    controller: { name, control, defaultValue, rules },
    ...rest
  } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error, invalid, isDirty, isTouched },
        }) => (
          <>
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              outlineStyle={{
                borderRadius: 40,
                backgroundColor: palette.white,
              }}
              placeholderTextColor={palette.icons}
              mode="outlined"
              outlineColor={palette.icons}
              activeOutlineColor={palette.primary}
              contentStyle={{
                fontWeight: "600",
                fontSize: 15,
                borderRadius: 0,
              }}
              autoCapitalize="none"
              style={{
                borderColor: palette.icons,
                fontSize: 15,
                fontWeight: "300",
              }}
              {...rest}
            />
            <HelperText
              type="error"
              visible={Boolean(error)}
              style={{
                color: palette.red,
                height: error ? "auto" : 10,
                textAlign: "center",
              }}
            >
              {error?.message}
            </HelperText>
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 100, width: "100%" },
});
