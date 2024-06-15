import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Controller, ControllerProps } from "react-hook-form";
import FilterListItem from "../FilterListItem";


type ControlProps = Omit<ControllerProps, "render">;

interface RadioBoxControllerProps {
  controller: ControlProps;
  data: { key: any; label: string };
}

export default function RadioBoxController(props: RadioBoxControllerProps) {
  const {
    controller: { name, control, defaultValue, rules },
    data,
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
            <FilterListItem
              onPress={() => onChange(data.key)}
              selected={value === data.key}
              label={data.label}
              containerStyle={{ marginRight: 5 }}
            />
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({});
