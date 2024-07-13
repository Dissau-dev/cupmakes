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
  Pressable,
} from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

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
  townCity: string;
  state: string;
}

export interface MyPickerProps {
  label: string;
  data: any;
  value: any;
  onChangeValue: Function;
  state: string;
  townCity: string;
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

export const MyPickerAccAso = ({
  icon,
  label,
  data,
  value,
  state,
  townCity,
  onChangeValue,
  isLoading,
  isSearchable = false,
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
      <Pressable
        onPress={() => {
          onCheckedValue(item.value);
          actionAtSelected && actionAtSelected();
        }}
        style={{ width: widthScreen }}
      >
        <View style={styles.card}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <AntDesign
              name="home"
              size={20}
              style={{ marginTop: 4 }}
              color={palette.secondary}
            />
          </View>

          <Text style={styles.titleCard}>{item.label}</Text>
          <Text style={styles.titleCard}>
            {`${item.townCity} -- ${item.state}`}
          </Text>
        </View>
      </Pressable>
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
              fontSize: 15,
              fontWeight: "300",
              width: 300,
              marginBottom: 5,
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
                  Select an Address{" "}
                </Text>

                <TouchableOpacity onPress={hideModal}>
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
              </View>
              <Divider />
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
                  iconColor={palette.secondary}
                />
              )}

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.76,
    marginHorizontal: 10,
    height: heightScrenn * 0.14,

    marginBottom: 10,

    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleCard: {
    fontFamily: "Avanta-Medium",
    fontSize: 22,

    color: palette.secondary,
    textAlign: "left",
    width: widthScreen * 0.6,
    marginHorizontal: widthScreen * 0.04,
    // marginRight: widthScreen * 0.01,
  },
});
