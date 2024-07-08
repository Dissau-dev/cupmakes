import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { CarParamList } from "../../routes/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLineItems, selectProducts } from "../../store/slices/cartSlice";

import Lottie from "lottie-react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { Baner } from "../../components/atoms/Baner";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedFAB, Badge } from "react-native-paper";
import { selectAuth, selectUser } from "../../store/slices/userSlice";

import cartAnimation from "../../../assets/looties/bagAnimation.json";

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "CarScreen"> {}

export const CarScreen = ({ navigation }: ProtectedScreenProps) => {
  const isAuth = useAppSelector(selectAuth);

  const products = useAppSelector(selectProducts);
  const lineal_items = useAppSelector(selectLineItems);
  console.log(lineal_items);
  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Baner />
      <Text style={styles.title}>What are you looking for?</Text>

      <View>
        <Pressable onPress={() => navigation.navigate("MyCartScreen")}>
          <View style={styles.card}>
            <View
              style={{
                marginLeft: widthScreen * 0.2,
                top: heightScrenn * 0.025,
                position: "absolute",
              }}
            >
              {products.length === 0 ? null : (
                <Badge
                  style={{
                    backgroundColor: palette.primary,
                    width: widthScreen * 0.1,
                    height: heightScrenn * 0.05,
                    borderRadius: 100,
                    fontSize: 16,
                  }}
                >
                  {products.length > 9 ? "9+" : products.length}
                </Badge>
              )}
            </View>

            <Ionicons
              name={"cart-outline"}
              size={100}
              color={palette.primary}
            />
            <Text style={styles.titleCard}>See My Cart</Text>
            <Ionicons
              name={"chevron-forward"}
              size={80}
              color={palette.primary}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("MyOrderScreen")}>
          <View style={styles.card}>
            <MaterialCommunityIcons
              name="order-bool-ascending-variant"
              size={100}
              color={palette.primary}
            />
            <Text style={styles.titleCard}>See My Orders</Text>
            <Ionicons
              name={"chevron-forward"}
              size={80}
              color={palette.primary}
            />
          </View>
        </Pressable>
      </View>
      <Lottie
        source={cartAnimation}
        autoPlay
        loop
        style={{
          width: widthScreen * 0.7,
          height: heightScrenn * 0.28,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: heightScrenn * 0.1,
    right: 16,
    backgroundColor: palette.primary,
    color: "green",
    position: "absolute",
  },
  title: {
    fontFamily: "Xamire-Medium",
    color: palette.secondary,
    fontSize: 50,

    height: 60,
    textAlign: "center",
    marginVertical: 20,
  },
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
    fontSize: 30,
    color: palette.primary,
    textAlign: "center",
    width: widthScreen * 0.4,
    marginHorizontal: widthScreen * 0.04,
    // marginRight: widthScreen * 0.01,
    marginBottom: heightScrenn * 0.04,
  },
});
