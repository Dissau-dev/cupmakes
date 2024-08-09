import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { CarParamList } from "../../routes/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  cleanCart,
  selectFullPrice,
  selectProducts,
} from "../../store/slices/cartSlice";

import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { Baner } from "../../components/atoms/Baner";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedFAB } from "react-native-paper";
import { selectAuth } from "../../store/slices/userSlice";
import { CartItem } from "../../components/atoms/Products/cart/CartItem";
import { EmptyCart } from "../../components/atoms/Products/cart/EmptyCart";
import { BarLoading } from "../../components/atoms/Products/cart/BarLoading";
import Toast from "react-native-toast-message";

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "MyCartScreen"> {}

export const MyCartScreen = ({ navigation }: ProtectedScreenProps) => {
  const dispatch = useAppDispatch();

  const [isExtended, setIsExtended] = React.useState(true);

  const products = useAppSelector(selectProducts);
  const fullPrice = useAppSelector(selectFullPrice);
  const isAuth = useAppSelector(selectAuth);

  const isIOS = Platform.OS === "ios";
  //@ts-ignore
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const onCheckout = () => {
    if (isAuth) {
      navigation.navigate("SelectAddress");
    } else {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Auth is required",
      });
      //@ts-ignore
      navigation.navigate("AuthProfileNavigator", {
        screen: "LoginProfileScreen",
      });
    }
  };
  return (
    <>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Baner />
      <BarLoading level={0} />
      <View style={{ marginBottom: heightScrenn * 0.18 }}>
        <FlatList
          ListHeaderComponent={
            products.length > 0 ? (
              <TouchableOpacity
                onPress={() => dispatch(cleanCart())}
                style={{
                  backgroundColor: palette.secondary,

                  justifyContent: "center",
                  alignSelf: "flex-end",
                  padding: 6,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  marginTop: 20,
                  marginHorizontal: 10,
                  //width: widthScreen * 0.26,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Avanta-Medium",
                    color: "#fff",
                    //color: palette.secondary,
                    textAlign: "center",
                  }}
                >
                  <Ionicons name="trash-bin" size={18} />
                  {"  "}
                  Clean cart
                </Text>
              </TouchableOpacity>
            ) : null
          }
          data={products}
          renderItem={({ item }) => <CartItem item={item} />}
          ListEmptyComponent={<EmptyCart />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={onScroll}
        />
      </View>
      {products.length > 0 ? (
        <AnimatedFAB
          icon={"credit-card-check-outline"}
          label={`Check out : $ ${fullPrice === 0 ? null : fullPrice}`}
          extended={isExtended}
          onPress={onCheckout}
          animateFrom={"right"}
          iconMode={"dynamic"}
          color="#fff"
          style={[styles.fabStyle]}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    backgroundColor: "#fff",
  },
  fabStyle: {
    bottom: heightScrenn * 0.02,
    right: widthScreen * 0.03,
    // left: 16,
    backgroundColor: palette.primary,
    position: "absolute",
  },
});
