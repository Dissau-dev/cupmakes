import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  //   TextInput,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Button,
  RadioButton,
  Searchbar,
  TextInput,
} from "react-native-paper";

import { globals } from "../../theme/styles/global";
import Layout from "../../utils/Layout";
import { palette } from "../../theme/colors";
import { ThemeContext } from "../../Context/theme/ThemeContext";
import { Image } from "expo-image";

export interface PickerItem {
  label: string;
  value: string;
  imageSrc?: string;
  blurhash?: string;
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
  const { theme } = useContext(ThemeContext);

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
    <TouchableOpacity
      onPress={() => {
        onCheckedValue(item.value);
        actionAtSelected && actionAtSelected();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingEnd: Layout.window.width * 0.5,
          maxWidth: "95%",
        }}
      >
        <View
          style={{
            width: 45,
            height: 45,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: "#c1c1c1",
            marginVertical: 5,

            marginHorizontal: 10,
          }}
        >
          {item.imageSrc === null ? (
            <Image
              source={require("../../../assets/images/genericImage.jpg")}
              style={{ width: 41, height: 41, borderRadius: 100 }}
              placeholder={item.blurhash}
            />
          ) : (
            <>
              <Image
                source={{
                  uri: `https://apidevpay.tecopos.com${item.imageSrc}`,
                }}
                style={{ width: 41, height: 41, borderRadius: 100 }}
                placeholder={item.blurhash}
              />
            </>
          )}
        </View>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
          }}
          // style={[
          //     value === item.value
          //         ? globals.h6Medium
          //         : globals.h6Light,
          // ]}
        >
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
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
              height: 50,
            }}
            placeholderTextColor={palette.icons}
            mode="outlined"
            outlineColor={palette.icons}
            activeOutlineColor={palette.primary}
            contentStyle={{ fontWeight: "600", fontSize: 15 }}
            autoCapitalize="none"
            style={{
              width: 280,
              height: 50,
              backgroundColor: palette.icons,
              color: palette.darkGray,
              borderColor: palette.icons,
              // borderRadius: 100,
              // paddingLeft: 20,
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
                color={palette.primary}
                rippleColor={palette.white}
                icon={() =>
                  isLoading ? (
                    <ActivityIndicator color={palette.icons} />
                  ) : (
                    <Ionicons
                      name="chevron-down-outline"
                      size={23}
                      style={[disabled && { opacity: 0.4 }]}
                      color={"#c1c1c1"}
                    />
                  )
                }
              />
            }
            left={
              <TextInput.Icon
                onPress={disabled ? () => {} : showModal}
                color={palette.primary}
                rippleColor={palette.white}
                icon={() =>
                  isLoading ? (
                    <ActivityIndicator color={palette.icons} />
                  ) : (
                    <Ionicons
                      name={
                        label === "Selecciona negocio"
                          ? "location-sharp"
                          : "card-outline"
                      }
                      size={23}
                      style={[disabled && { opacity: 0.4 }]}
                      color={"#c1c1c1"}
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

        {/* TODO: Pending to do */}
        {/* {isLoading && <ActivityIndicator />} */}

        {/* Modal component */}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          onRequestClose={hideModal}
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.title}> Entidades</Text>
                <Button rippleColor={palette.primary} onPress={hideModal}>
                  <Text>
                    <Fontisto name="close" size={20} color={"#fff"} />
                  </Text>
                </Button>
              </View>
              {/* <Text style={styles.selectAccountText}></Text>*/}

              {/* Search bar */}
              {isSearchable && (
                <Searchbar
                  value={textValue}
                  onChangeText={onTextChange}
                  style={[globals.search, { width: "90%" }]}
                  inputStyle={globals.searchInput}
                  selectionColor={palette.primary}
                  placeholder="Buscar"
                  placeholderTextColor={palette.icons}
                  returnKeyType="search"
                  autoCapitalize="none"
                  cursorColor={palette.primary}
                  clearButtonMode="while-editing"
                  // editable={isSearching && data.length === 0}
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
                  // onSubmitEditing={({ nativeEvent }) => {
                  //   console.log(nativeEvent.text);
                  // }}

                  iconColor={palette.primary}
                  // editable={!isLoading && !isFetching}
                />
              )}
              {dataStore.length === 0 ? (
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    maxWidth: "90%",
                  }}
                >
                  Sin resutados{" "}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    maxWidth: "90%",
                  }}
                >
                  Seleccione la entidad deseada
                </Text>
              )}
              {/* cambiar el render item */}
              <FlatList
                data={dataStore}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    margin: 16,
    height: Layout.window.height * 0.72,
    width: Layout.window.width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: palette.primary,
    height: 50,
    width: Layout.window.width * 0.9,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    margin: 6,
    marginLeft: 14,
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  selectAccountText: {
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
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

  input: {
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});
