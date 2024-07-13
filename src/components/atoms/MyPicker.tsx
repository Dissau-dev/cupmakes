import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  //   TextInput,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Dialog,
  Divider,
  RadioButton,
  Searchbar,
  TextInput,
} from "react-native-paper";

import { globals, heightScrenn, widthScreen } from "../../theme/styles/global";

import { palette } from "../../theme/colors";

export interface PickerItem {
  label: string;
  value: string;
}

export interface MyPickerProps {
  label: string;
  data: any;
  value: any;
  onChangeValue: Function;

  icon?: any;
  isLoading?: boolean;
  isSearchable?: boolean;
  size?: "large" | "small";
  error?: any;
  refChild?: any;
  titleInModal?: string;
  notFoundText?: string;

  actionAtSelected?: Function;
  disabled?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

export const MyPicker = ({
  icon,
  label,
  data,
  value,
  onChangeValue,
  isLoading,
  isSearchable = true,
  error,
  refChild,
  actionAtSelected,
  disabled,
  titleInModal,
  inputStyle,
  notFoundText,
}: MyPickerProps) => {
  //Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //Search bar
  const [textValue, setTextValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const onTextChange = (text: string) => {
    setIsSearching(true);
    setTextValue(text);
    setDataStore(
      data.filter((item: any) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  //Content
  const [dataStore, setDataStore] = useState([]);
  useEffect(() => {
    setDataStore(data);
  }, [data]);

  const onCheckedValue = (itemValue: string) => {
    onChangeValue(itemValue);
    hideModal();
  };

  const renderItem = ({ item }: { item: PickerItem }) => (
    <View
      style={{
        // flexDirection: "row",
        //alignItems: "center",
        paddingEnd: 25,
      }}
    >
      {/* <RadioButton
        value={item.value}
        color={palette.primary}
        uncheckedColor={palette.lightPrimary}
        status={value === item.value ? "checked" : "unchecked"}
        onPress={() => {
          onCheckedValue(item.value);
          actionAtSelected && actionAtSelected();
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          onCheckedValue(item.value);
          actionAtSelected && actionAtSelected();
        }}
        style={{ width: widthScreen, padding: 16 }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 20,
            fontFamily: "Avanta-Medium",
          }}
          // style={[
          //     value === item.value
          //         ? globals.h6Medium
          //         : globals.h6Light,
          // ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        {/* Visual component */}
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.6}
          onPress={disabled ? () => {} : showModal}
          style={{ width: "100%", alignItems: "center" }}
        >
          {/* <View
            style={[
              visible
                ? { borderColor: theme.colors.primary }
                : { borderColor: colors.grey },
              styles.input,
              inputStyle,
            ]}
          > */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 16,
              marginVertical: 6.9,
            }}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={23}
                style={[
                  {
                    marginEnd: 5,
                  },
                  disabled && { opacity: 0.4 },
                ]}
              />
            )} */}
          <TextInput
            placeholder={label}
            outlineStyle={{
              borderRadius: 10,
              backgroundColor: palette.white,
            }}
            placeholderTextColor={palette.icons}
            mode="outlined"
            outlineColor={palette.icons}
            activeOutlineColor={palette.secondary}
            contentStyle={{ fontWeight: "600", fontSize: 15 }}
            autoCapitalize="none"
            style={{
              borderColor: palette.icons,
              fontSize: 16,
              fontWeight: "300",
              width: 300,
              marginBottom: 2,
              height: 45,
            }}
            value={
              (value &&
                data?.find((item: any) => item.value === value)?.label) ?? {
                label,
              }
            }
            onFocus={showModal}
            onBlur={hideModal}
            editable={false}
            ref={refChild}
            right={
              <TextInput.Icon
                onPress={disabled ? () => {} : showModal}
                color={palette.darkGray}
                rippleColor={palette.datesFilter}
                icon={() =>
                  isLoading ? (
                    <ActivityIndicator color={palette.icons} />
                  ) : (
                    <Ionicons
                      name="chevron-down-outline"
                      size={23}
                      style={[disabled && { opacity: 0.4 }]}
                      color={palette.secondary}
                    />
                  )
                }
              />
            }
          />
          {/* {error && (
              <Ionicons
                name="alert-circle-outline"
                size={23}
                // color={theme.error}
              />
            )}
            <Ionicons
              name="chevron-down-outline"
              size={23}
              style={[disabled && { opacity: 0.4 }]}
              color={palette.circularProgressBar}
            />
          </View> */}
          {/* </View> */}
        </TouchableOpacity>
        {!!error && (
          <Text
            style={[
              {
                // color: theme.error,
                marginStart: 5,
                alignSelf: "flex-start",
              },
            ]}
          >
            {error}
          </Text>
        )}

        {/* TODO: Pending to do */}
        {/* {isLoading && <ActivityIndicator />} */}

        {/* Modal component */}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          onRequestClose={hideModal}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            }}
          >
            <View
              style={{
                padding: 20,
                // paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "white",
                height: heightScrenn * 0.58,
                width: widthScreen * 0.9,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24, fontFamily: "Avanta-Medium" }}>
                  Select a state{" "}
                </Text>
                <TouchableOpacity onPress={hideModal}>
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
              </View>

              {/* Search bar */}
              {isSearchable && (
                <Searchbar
                  value={textValue}
                  onChangeText={onTextChange}
                  style={[globals.search, { width: "100%" }]}
                  inputStyle={globals.searchInput}
                  placeholder="Search"
                  placeholderTextColor={palette.icons}
                  returnKeyType="search"
                  autoCapitalize="none"
                  cursorColor={palette.secondary}
                  clearButtonMode="while-editing"
                  // editable={isSearching && data.length === 0}
                  enablesReturnKeyAutomatically
                  icon={() => (
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons
                          name={"search-outline"}
                          size={18}
                          color={palette.secondary}
                          style={{ fontWeight: "bold" }}
                        />
                      )}
                    />
                  )}
                  // onSubmitEditing={({ nativeEvent }) => {
                  //   console.log(nativeEvent.text);
                  // }}

                  iconColor={palette.secondary}
                  // editable={!isLoading && !isFetching}
                />
                // <View
                //   style={[styles.textBackground, { marginHorizontal: -15 }]}
                // >
                //   <TextInput
                //     placeholder="Buscar..."
                //     style={{
                //       ...styles.searchInput,
                //       top: Platform.OS === "ios" ? 0 : 2,
                //     }}
                //     autoCapitalize="none"
                //     autoCorrect={false}
                //     value={textValue}
                //     onChangeText={onTextChange}
                //   />
                //   <Ionicons name="search-outline" color="grey" size={24} />
                // </View>
              )}
              {/* Content */}
              {data.length === 0 ? (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 50,
                    }}
                  >
                    <Text style={styles.title}>{notFoundText || ""}</Text>
                  </View>
                </View>
              ) : isSearching && dataStore.length === 0 ? (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 50,
                    }}
                  >
                    <Text style={styles.title}>
                      There are no results to show
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  {/*  <Text
                    style={[
                      // globals.h6Medium,
                      { marginVertical: 10, textAlign: "center" },
                    ]}
                  >
                    {titleInModal ? titleInModal : `Seleccione una opción`}
                  </Text> */}
                  <FlatList
                    data={dataStore}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    marginStart: 45,
    marginVertical: Platform.OS === "ios" ? 15 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    marginTop: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  address: {
    fontSize: 18,
    width: "100%",
    paddingEnd: 10,
  },
  textBackground: {
    backgroundColor: "#F3F1F3",
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  title: {
    marginVertical: 16,
    fontSize: 16,
    opacity: 0.9,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: 100,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});
