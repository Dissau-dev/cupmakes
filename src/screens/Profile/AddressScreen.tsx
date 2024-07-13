import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";

import { heightScrenn, widthScreen } from "../../theme/styles/global";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Paragraph,
  Portal,
  SegmentedButtons,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { selectUser } from "../../store/slices/userSlice";
import PickerControllerAccAso from "../../components/atoms/formControls/PickerControllerAccAso";

import states from "../../utils/Data";
import PickerController from "../../components/atoms/formControls/PickerController";
import {
  addAddress,
  removeAddress,
  selectAddresses,
  selectPickupAddresses,
} from "../../store/slices/addressesSlice";
import { ProfileParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import addressAnimation from "../../../assets/looties/Animation - 2.json";

interface Props extends StackScreenProps<ProfileParamList, "AddressScreen"> {}

export default function AddressScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAddresses);
  const [value, setValue] = useState("delivery");

  const dataDelivery = data.filter((i) => i.type === "DELIVERY");
  const dataPickUp = data.filter((i) => i.type === "PICKUP");
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleYes = (id: any) => {
    dispatch(removeAddress(id));
    hideDialog();
  };

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <SegmentedButtons
        value={value}
        style={{
          marginTop: heightScrenn * 0.05,
          width: widthScreen * 0.9,
          alignSelf: "center",
        }}
        onValueChange={setValue}
        buttons={[
          {
            value: "delivery",
            label: "Delivery",
            checkedColor: palette.white,
            style: {
              backgroundColor:
                value === "delivery" ? palette.primary : palette.white,
            },
            showSelectedCheck: true,
          },
          {
            value: "pickUp",
            label: "Pick up",
            checkedColor: palette.white,
            style: {
              backgroundColor:
                value === "pickUp" ? palette.primary : palette.white,
            },
            showSelectedCheck: true,
          },
        ]}
      />
      {value === "pickUp" ? (
        <View>
          <FlatList
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    color: palette.secondary,
                    fontFamily: "Avanta-Medium",
                    fontSize: 30,
                    textAlign: "center",
                    marginVertical: heightScrenn * 0.05,
                  }}
                >
                  No pick up addresses
                </Text>
                <LottieView
                  source={addressAnimation}
                  autoPlay
                  loop
                  style={{
                    width: widthScreen * 1,
                    height: heightScrenn * 0.45,
                    alignSelf: "center",
                  }}
                />
              </View>
            }
            ListHeaderComponent={
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddAddress", {
                    type: "PICKUP",
                    title: "Add Pick up Address",
                  })
                }
                style={styles.addButton}
              >
                <Text style={styles.textAddBtn}>
                  <Ionicons name="add" size={20} />
                  {"  "} Add Address
                </Text>
              </TouchableOpacity>
            }
            data={dataPickUp}
            renderItem={({ item }) => (
              <View>
                <Pressable>
                  <View style={styles.card}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Entypo
                        name="shop"
                        size={24}
                        style={{ marginTop: 10 }}
                        color={palette.secondary}
                      />
                      <View style={{ flexDirection: "row" }}>
                        <IconButton
                          icon="delete"
                          iconColor={palette.secondary}
                          size={20}
                          onPress={showDialog}
                        />
                        <IconButton
                          icon="pencil"
                          iconColor={palette.secondary}
                          size={20}
                          onPress={() =>
                            navigation.navigate("AddAddress", {
                              type: "PICKUP",
                              title: "Edit Pick Up Address",
                              id: item.id,
                              isEditing: true,
                              apartmentSuiteUnitEtc: item.apartmentSuiteUnitEtc,
                              companyName: item.companyName,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              state: item.state,
                              streetAddress: item.streetAddress,
                              townCity: item.townCity,
                              zipCode: item.zipCode,
                            })
                          }
                        />
                      </View>
                    </View>

                    <Text style={styles.titleCard}>{item.streetAddress}</Text>
                    <Text style={styles.titleCard}>
                      {`${item.townCity} -- ${item.state}`}
                    </Text>
                  </View>
                </Pressable>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title
                      style={{ fontFamily: "Avanta-Medium", fontSize: 30 }}
                    >
                      Alert
                    </Dialog.Title>
                    <Divider />
                    <Dialog.Content>
                      <Paragraph
                        style={{
                          fontFamily: "Avanta-Medium",
                          fontSize: 20,
                          marginTop: 6,
                        }}
                      >
                        Do you want to delete the address?
                      </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
                      <Button
                        onPress={() => handleYes(item.id)}
                        labelStyle={{ color: palette.secondary }}
                        rippleColor={palette.secondary}
                      >
                        OK
                      </Button>
                      <Button
                        onPress={hideDialog}
                        labelStyle={{ color: palette.secondary }}
                        rippleColor={palette.secondary}
                      >
                        Cancel
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{ marginBottom: heightScrenn * 0.22 }}>
          <FlatList
            ListHeaderComponent={
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddAddress", {
                      type: "DELIVERY",
                      title: "Add Delivery Address",
                    })
                  }
                  style={styles.addButton}
                >
                  <Text style={styles.textAddBtn}>
                    <Ionicons name="add" size={20} />
                    {"  "} Add Address
                  </Text>
                </TouchableOpacity>
              </>
            }
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    color: palette.secondary,
                    fontFamily: "Avanta-Medium",
                    fontSize: 30,
                    textAlign: "center",
                    marginVertical: heightScrenn * 0.05,
                  }}
                >
                  No delivery addresses
                </Text>
                <LottieView
                  source={addressAnimation}
                  autoPlay
                  loop
                  style={{
                    width: widthScreen * 1,
                    height: heightScrenn * 0.45,
                    alignSelf: "center",
                  }}
                />
              </View>
            }
            data={dataDelivery}
            renderItem={({ item }) => (
              <View>
                <Pressable>
                  <View style={styles.card}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <AntDesign
                        name="home"
                        size={24}
                        style={{ marginTop: 10 }}
                        color={palette.secondary}
                      />
                      <View style={{ flexDirection: "row" }}>
                        <IconButton
                          icon="delete"
                          iconColor={palette.secondary}
                          size={20}
                          onPress={showDialog}
                        />
                        <IconButton
                          icon="pencil"
                          iconColor={palette.secondary}
                          size={20}
                          onPress={() =>
                            navigation.navigate("AddAddress", {
                              type: "DELIVERY",
                              title: "Edit Delivery Address",
                              id: item.id,
                              isEditing: true,
                              apartmentSuiteUnitEtc: item.apartmentSuiteUnitEtc,
                              companyName: item.companyName,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              state: item.state,
                              streetAddress: item.streetAddress,
                              townCity: item.townCity,
                              zipCode: item.zipCode,
                            })
                          }
                        />
                      </View>
                    </View>

                    <Text style={styles.titleCard}>{item.streetAddress}</Text>
                    <Text style={styles.titleCard}>
                      {`${item.townCity} -- ${item.state}`}
                    </Text>
                  </View>
                </Pressable>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title
                      style={{ fontFamily: "Avanta-Medium", fontSize: 30 }}
                    >
                      Alert
                    </Dialog.Title>
                    <Divider />
                    <Dialog.Content>
                      <Paragraph
                        style={{
                          fontFamily: "Avanta-Medium",
                          fontSize: 20,
                          marginTop: 6,
                        }}
                      >
                        Do you want to delete the address?
                      </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
                      <Button
                        onPress={() => handleYes(item.id)}
                        labelStyle={{ color: palette.secondary }}
                        rippleColor={palette.secondary}
                      >
                        OK
                      </Button>
                      <Button
                        onPress={hideDialog}
                        labelStyle={{ color: palette.secondary }}
                        rippleColor={palette.secondary}
                      >
                        Cancel
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,
    alignSelf: "center",
    marginVertical: 6,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,

    marginTop: 10,
  },
  textInput: {
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    color: palette.secondary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 2,

    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 16,
    position: "absolute",
    bottom: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: widthScreen,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: palette.secondary,

    justifyContent: "center",
    alignSelf: "flex-end",
    padding: 6,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 30,
    marginVertical: 20,
    marginHorizontal: 10,
    //width: widthScreen * 0.26,
  },
  textAddBtn: {
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    color: "#fff",
    //color: palette.secondary,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.935,
    marginHorizontal: 10,
    height: heightScrenn * 0.2,

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
    fontSize: 26,
    color: palette.secondary,
    textAlign: "left",
    width: widthScreen * 0.8,
    marginHorizontal: widthScreen * 0.04,
    // marginRight: widthScreen * 0.01,
  },
});
