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

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "OrdersDetail"> {}
export const OrdersDetail = () => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>Order # 8909</Text>
          <Text>procesinf</Text>
        </View>
        <Text>Mauricio García</Text>
        <Text>Bon Avue 902</Text>
        <Text>data : 1noc/dic/1903</Text>
        <Text> Local Pick up</Text>
        <Text>"payment_method": "bacs",</Text>
        <Text> "payment_method_title": "Direct Bank Transfer"</Text>
        <Text> "city": "Tampa", "state": "Florida", "postcode": "32011",</Text>
      </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: palette.primary,
  },
  orderDate: {
    fontSize: 14,
    color: "#888",
  },
  orderStatus: {
    fontSize: 14,
    color: "#000",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
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
