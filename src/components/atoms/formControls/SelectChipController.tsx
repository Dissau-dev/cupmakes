import { StyleSheet } from "react-native";
import React from "react";

import { Controller, ControllerProps } from "react-hook-form";
import FilterListItem from "../FilterListItem";

type ControlProps = Omit<ControllerProps, "render">;

interface SelectChipControllerProps {
  controller: ControlProps;
  data: { key: number; label: string };
}

export default function SelectChipController(props: SelectChipControllerProps) {
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
      render={({ field: { onChange, value } }) => {
        const isSelected = value === data.key;

        return (
          <FilterListItem
            onPress={() => onChange(!isSelected ? data.key : undefined)}
            selected={isSelected}
            label={data.label}
            containerStyle={{ marginRight: 5 }}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
