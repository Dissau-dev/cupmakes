import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { Controller, ControllerProps } from "react-hook-form";

import { FilterBarButtons } from "../FilterBarButtons";

type ControlProps = Omit<ControllerProps, "render">;

interface RadioButtonControllerProps {
  controller: ControlProps;
  data: { key: any; label?: string };
}

export default function RadioButtonController(
  props: RadioButtonControllerProps
) {
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
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <>
            <FilterBarButtons
              isSelected={value === data.key}
              onPress={() => onChange(data.key)}
              label={data?.label}
              
            />
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({});
