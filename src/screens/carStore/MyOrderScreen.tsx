import React from "react";

import { CarParamList } from "../../routes/types";
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

import cartAnimation from "../../../assets/looties/bagEmpty.json";
import Animation from "../../../assets/looties/Loading2.json";
import Lottie from "lottie-react-native";

interface Props extends StackScreenProps<CarParamList, "MyOrderScreen"> {}
export const MyOrderScreen = ({ navigation }: Props) => {
  const currentUser = useAppSelector(selectUser);

  const { data: orders, isLoading } = useGetOrdersCustomerQuery(
    //@ts-ignore
    currentUser?.id
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.orderNumber}>Order #{item.id}</Text>

        <View
          style={{
            // backgroundColor: "#c11717",
            justifyContent: "center",
            padding: 6,
            borderWidth: 0.5,
            borderRadius: 10,

            width: widthScreen * 0.4,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Avanta-Medium",
              //color: "#fff",
              color: palette.secondary,
              textAlign: "center",
            }}
          >
            {item.status === "completed" ? (
              <Fontisto name={"checkbox-active"} size={14} />
            ) : (
              <Fontisto name={"checkbox-passive"} size={14} />
            )}

            {"  "}
            {item.status}
          </Text>
        </View>
      </View>
      <Text>
        <Text style={styles.orderTotal}>Date:</Text>
        <Text style={styles.orderDate}>
          {" "}
          {moment(item.date_created).format("DD-MM-YYYY,  HH:mm")}
        </Text>
      </Text>
      <Text>
        <Text style={styles.orderTotal}>Total:</Text>
        <Text style={styles.orderDate}> {item.total}</Text>
      </Text>

      {/*  <Button
        onPress={() => navigation.navigate("OrdersDetail")}
        style={{
          backgroundColor: palette.primary,
          borderRadius: 10,
          width: widthScreen * 0.4,
          alignSelf: "center",
          marginTop: 10,
        }}
        rippleColor={palette.datesFilter}
        labelStyle={{
          color: "#fff",
          fontFamily: "Avanta-Medium",
          fontSize: 22,
        }}
      >
        <Text>Detail</Text>
      </Button>*/}
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
            <Lottie
              source={cartAnimation}
              autoPlay
              loop
              style={{
                width: widthScreen * 1,
                height: heightScrenn * 0.45,
                alignSelf: "center",
              }}
            />
            <Button
              onPress={() => console.log("p")}
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
