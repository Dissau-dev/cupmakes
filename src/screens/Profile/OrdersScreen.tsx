import React from "react";

import { CarParamList, ProfileParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useGetOrdersCustomerQuery } from "../../store/api/productsApi";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import moment from "moment";
import { Badge, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/userSlice";

import cartAnimation from "../../../assets/looties/Animation - 3.json";
import Animation from "../../../assets/looties/Loading2.json";
import Lottie from "lottie-react-native";
import Logo from "../../../assets/placeholders/empty_orders.svg";

interface Props extends StackScreenProps<ProfileParamList, "OrdersScreen"> {}
export const OrdersScreen = ({ navigation }: Props) => {
  const currentUser = useAppSelector(selectUser);

  const { data: orders, isLoading } = useGetOrdersCustomerQuery(
    //@ts-ignore
    currentUser?.id
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.orderNumber}>Order #{item.id}</Text>

          <View>
            <Text
              style={{
                fontSize: 23,
                fontFamily: "Avanta-Medium",
                //color: "#fff",
                color: palette.secondary,
                textAlign: "center",
              }}
            >
              {" "}
              {}
              <AntDesign
                size={16}
                name={
                  item.status === "completed"
                    ? "check"
                    : item.status === "failed" || item.status === "cancelled"
                    ? "close"
                    : "loading1"
                }
              />
              {"  "}
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.orderTotal}>Date: </Text>
          <Text style={[styles.orderDate, { marginTop: heightScrenn * 0.01 }]}>
            {" "}
            {moment(item.date_created).format("DD-MM-YYYY,  HH:mm")}
          </Text>
        </View>
        <Text>
          <Text style={styles.orderTotal}>Total: </Text>
          <Text style={styles.orderDate}> ${item.total}</Text>
        </Text>
        {/*<Text style={styles.customer}>Cliente: {item.billing.first_name}</Text> */}
        <Text style={styles.orderTotal}>
          Products:{" "}
          {item.line_items.map((i) => (
            <Text
              key={i.name}
              style={[styles.orderDate, { width: widthScreen * 0.8 }]}
            >
              {i.name} ({i.quantity}){" ,"}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View>
        <FocusAwareStatusBar
          barStyle={"default"}
          backgroundColor={palette.primary}
          translucent={false}
        />

        <Text
          style={{
            fontFamily: "Xamire-Medium",
            fontSize: 50,
            textAlign: "center",

            marginVertical: 20,

            color: palette.secondary,
            height: 50,
          }}
        >
          Fresh and Tasty
        </Text>
        <Lottie
          source={Animation}
          autoPlay
          loop
          style={{
            width: widthScreen * 1,
            height: heightScrenn * 0.68,
            alignSelf: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View>
            <Text
              style={{
                color: palette.secondary,
                fontFamily: "Xamire-Medium",
                fontSize: 70,
                textAlign: "center",
                marginVertical: heightScrenn * 0.05,
              }}
            >
              No order history
            </Text>
            <Logo
              width={widthScreen * 0.8}
              height={heightScrenn * 0.4}
              style={{ alignSelf: "center" }}
            />
            <Button
              onPress={() =>
                //@ts-ignore
                navigation.navigate("ProductsNavigator", {
                  screen: "ProductsScreen",
                })
              }
              rippleColor={palette.datesFilter}
              // rippleColor={"#FF5C35"}
              textColor="#fff"
              style={{
                marginVertical: 40,
                borderRadius: 100,
                backgroundColor: palette.primary,
                width: widthScreen * 0.6,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  alignContent: "center",
                  fontSize: 18,
                }}
              >
                Order Now
              </Text>
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.935,
    marginHorizontal: 10,
    height: heightScrenn * 0.2,
    marginVertical: 5,
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
  orderNumber: {
    fontSize: 24,
    fontFamily: "Avanta-Bold",
    color: palette.primary,
  },
  orderDate: {
    fontSize: 20,
    color: "#888",
    fontFamily: "Avanta-Bold",
  },
  orderStatus: {
    fontSize: 14,
    color: "#000",
  },
  orderTotal: {
    fontSize: 22,
    fontFamily: "Avanta-Bold",
    marginVertical: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: widthScreen * 0.95,
    alignSelf: "center",
    marginTop: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    // Contenido de la tarjeta
  },
  /*  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },*/
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  customer: {
    fontSize: 14,
    marginBottom: 5,
  },
  products: {
    // Productos de la orden
  },
  productItem: {
    fontSize: 12,
    marginBottom: 2,
  },
});

{
  /* return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />

    </View>
  );*/
}
