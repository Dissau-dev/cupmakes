import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, FlatList } from "react-native";
import { CarParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { BarLoading } from "../../components/atoms/Products/cart/BarLoading";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { useAppSelector } from "../../store/hooks";
import { selectAddresses } from "../../store/slices/addressesSlice";
import { Dialog, Divider, Paragraph, Portal } from "react-native-paper";

interface Props extends StackScreenProps<CarParamList, "SelectAddress"> {}
export const SelectAddress = ({ navigation }: Props) => {
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dialogData, setDialogData] = useState([]);
  const [shop, setShop] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const showDialogStore = (title: string, data: any[]) => {
    setDialogTitle(title);
    setDialogData(data);
    setShop(true);
    setVisible(true);
    setIsSelected(true);
  };
  const showDialogHome = (title: string, data: any[]) => {
    setDialogTitle(title);
    setDialogData(data);
    setVisible(true);
    setShop(false);
    setIsSelected(true);
  };

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setVisible(false);
    navigation.navigate("TakeOrderScreen", {
      Address: address,
      isSelected: true,
    });
  };
  const handleAnotherAddress = () => {
    setVisible(false);
    navigation.navigate("TakeOrderScreen", {
      isSelected: false,
    });
  };

  const addressDelivery = useAppSelector(selectAddresses).filter(
    (i) => i.type === "DELIVERY"
  );
  const addressPickUp = useAppSelector(selectAddresses).filter(
    (i) => i.type === "PICKUP"
  );
  return (
    <>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <BarLoading level={1} />

      <View style={{ marginTop: heightScrenn * 0.05 }}>
        <Pressable
          onPress={() =>
            showDialogHome("Select Delivery Address", addressDelivery)
          }
        >
          <View style={styles.card}>
            <AntDesign name="home" size={100} color={palette.primary} />
            <Text style={styles.titleCard}>Delivery Address</Text>
            <Ionicons
              name={"chevron-forward"}
              size={80}
              color={palette.primary}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            showDialogStore("Select Pick Up Address", addressPickUp)
          }
        >
          <View style={styles.card}>
            <Entypo name="shop" size={100} color={palette.primary} />
            <Text style={styles.titleCard}>Pick up Address</Text>
            <Ionicons
              name={"chevron-forward"}
              size={80}
              color={palette.primary}
            />
          </View>
        </Pressable>
        <Pressable onPress={handleAnotherAddress}>
          <View style={styles.card}>
            <MaterialCommunityIcons
              name="order-bool-ascending-variant"
              size={100}
              color={palette.primary}
            />
            <Text style={styles.titleCard}>Write another Address</Text>
            <Ionicons
              name={"chevron-forward"}
              size={80}
              color={palette.primary}
            />
          </View>
        </Pressable>
      </View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{
            backgroundColor: "#fff",
            width: widthScreen * 0.96,
            alignSelf: "center",
            paddingVertical: 10,
          }}
        >
          <Dialog.Title style={{ fontFamily: "Avanta-Medium", fontSize: 22 }}>
            {dialogTitle}
          </Dialog.Title>
          <Divider />
          <FlatList
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Avanta-Medium",
                    margin: 20,
                  }}
                >
                  Sorry , not found Address
                </Text>
              </View>
            }
            data={dialogData}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleAddressSelect(item)}>
                <View style={styles.card1}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {!shop ? (
                      <AntDesign
                        name="home"
                        size={16}
                        color={palette.secondary}
                      />
                    ) : (
                      <Entypo name="shop" size={16} color={palette.secondary} />
                    )}
                  </View>

                  <Text style={styles.titleCard1}>{item.streetAddress}</Text>
                  <Text style={styles.titleCard1}>
                    {`${item.townCity} -- ${item.state}`}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.935,
    marginHorizontal: 10,
    height: heightScrenn * 0.2,
    paddingVertical: 10,
    marginBottom: 10,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 20,
    color: palette.primary,
    textAlign: "center",
    width: widthScreen * 0.4,
    marginHorizontal: widthScreen * 0.04,
    // marginRight: widthScreen * 0.01,
    marginBottom: heightScrenn * 0.04,
  },
  card1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.8,
    marginHorizontal: 10,

    paddingVertical: 10,
    marginBottom: 10,
    alignSelf: "center",

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
  titleCard1: {
    fontFamily: "Avanta-Medium",
    fontSize: 16,
    color: palette.secondary,
    textAlign: "left",
    width: widthScreen * 0.7,
    marginHorizontal: widthScreen * 0.04,
    // marginRight: widthScreen * 0.01,
  },
});
