import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar, SearchbarProps, TextInput } from "react-native-paper";
import { Controller, ControllerProps } from "react-hook-form";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";

type ControlProps = Omit<ControllerProps, "render">;

interface SearchInputControllerProps extends Omit<SearchbarProps, "value"> {
  controller: ControlProps;
}

export default function SearchInputController(
  props: SearchInputControllerProps
) {
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
          <Searchbar
            ref={ref}
            value={value}
            onChangeText={onChange}
            style={[styles.search]}
            inputStyle={styles.input}
            placeholder="Buscar"
            placeholderTextColor={palette.icons}
            returnKeyType="search"
            autoCapitalize="none"
            cursorColor={palette.primary}
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically
            icon={() => (
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name={"search-outline"}
                    size={18}
                    color={palette.primary}
                    style={{ fontWeight: "bold" }}
                  />
                )}
              />
            )}
            iconColor={palette.primary}
            // onClearIconPress={onClearSearch}
            {...rest}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    width: "90%",
    backgroundColor: palette.white,
    borderColor: palette.datesFilter,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 42,
    padding: 0,
    // marginBottom: 10,
    borderWidth: 1,
  },
  input: {
    fontSize: 15,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
