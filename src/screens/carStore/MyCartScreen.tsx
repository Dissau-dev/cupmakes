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
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectFullPrice,
  selectLineItems,
  selectProducts,
  setInputQuantity,
  setQuantity,
} from "../../store/slices/cartSlice";
import { api_configs } from "../../config/system_config";
import axios from "axios";

import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { Baner } from "../../components/atoms/Baner";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { AnimatedFAB, Button, TextInput } from "react-native-paper";

import cartAnimation from "../../../assets/looties/cartEmpty.json";
import { selectAuth, selectUser } from "../../store/slices/userSlice";
import Lottie from "lottie-react-native";
import { useForm } from "react-hook-form";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import TextInputControllerHolderName from "../../components/atoms/formControls/TextInputControllerHolderName";
import { CartItem } from "../../components/atoms/Products/cart/CartItem";
import { EmptyCart } from "../../components/atoms/Products/cart/EmptyCart";

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "MyCartScreen"> {}

export const MyCartScreen = ({ navigation }: ProtectedScreenProps) => {
  const dispatch = useAppDispatch();
  /*  const line_Items: { product_id: number; quantity: number }[] = [];

  const formatLineItems = () => {
    products.forEach((i) => {
      line_Items.push({ product_id: i.id, quantity: i.quantity });
    });

    return line_Items;
  };*/

  useEffect(() => {
    // formatLineItems();
    //console.log(line_Items);
  }, []);

  const [isExtended, setIsExtended] = React.useState(true);

  const products = useAppSelector(selectProducts);
  const fullPrice = useAppSelector(selectFullPrice);
  const linealItems = useAppSelector(selectLineItems);

  console.log(linealItems);

  const isIOS = Platform.OS === "ios";
  //@ts-ignore
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Baner />
      <View style={{ marginBottom: heightScrenn * 0.09 }}>
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
                    fontSize: 20,
                    fontFamily: "Avanta-Medium",
                    color: "#fff",
                    //color: palette.secondary,
                    textAlign: "center",
                  }}
                >
                  <Ionicons name="trash-bin" size={14} />
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
          onPress={() => navigation.navigate("TakeOrderScreen")}
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
