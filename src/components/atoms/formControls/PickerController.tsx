import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { MyPicker, MyPickerProps } from "../MyPicker";


type ControlProps = Omit<ControllerProps, "render">;

interface PickerControllerProps
  extends Omit<MyPickerProps, "value" | "onChangeValue" | "refChild"> {
  controller: ControlProps;
}

export default function PickerController(props: PickerControllerProps) {
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
          <MyPicker
            {...rest}
            value={value}
            onChangeValue={onChange}
            refChild={ref}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({});
