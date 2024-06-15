import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { Controller, ControllerProps } from "react-hook-form";
import FilterListItem from "../FilterListItem";
import FilterListNotification from "../FilterListNotification";

type ControlProps = Omit<ControllerProps, "render">;

interface CheckBoxControllerProps {
  controller: ControlProps;
  data: { key: any; label: string; notification?: boolean };
}

export default function CheckBoxController(props: CheckBoxControllerProps) {
  const {
    controller: { name, control, defaultValue, rules },
    data,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid, isDirty, isTouched },
      }) => {
        return data.notification === true ? (
          <FilterListNotification
            onPress={() => onChange(!value)}
            selected={value}
            label={data.label}
            containerStyle={{ marginRight: 5 }}
          />
        ) : (
          <FilterListItem
            onPress={() => onChange(!value)}
            selected={value}
            label={data.label}
            containerStyle={{ marginRight: 5 }}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
