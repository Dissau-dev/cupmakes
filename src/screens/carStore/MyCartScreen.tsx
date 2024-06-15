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
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectFullPrice,
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

const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";

const base64 = require("base-64");

export const MyCartScreen = ({ navigation }: ProtectedScreenProps) => {
  const [inputActive, setInputActive] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const line_Items: { product_id: number; quantity: number }[] = [];

  const formatLineItems = () => {
    products.forEach((i) => {
      line_Items.push({ product_id: i.id, quantity: 1 });
    });

    return line_Items;
  };
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialInputValues = {};
    products.forEach((product) => {
      //@ts-ignore
      initialInputValues[product.id] = product.quantity;
    });
    /*products.forEach((element) => {
      setinputValue(element.quantity.toString());
      console.log("se ejecuta el useEffect");
    });*/
    formatLineItems();
    setInputValues(initialInputValues);

    //console.log(line_Items);
  }, []);

  const [isExtended, setIsExtended] = React.useState(true);

  const products = useAppSelector(selectProducts);
  const fullPrice = useAppSelector(selectFullPrice);
  // const lineItems = useAppSelector(selectLineItems);
  const dispatch = useAppDispatch();

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

      <FlatList
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        ListEmptyComponent={<EmptyCart />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        // onScroll={onScroll}
      />

      {products.length > 0 ? (
        <AnimatedFAB
          icon={"credit-card-check-outline"}
          label={`Pagar : $ ${fullPrice === 0 ? null : fullPrice}`}
          extended={isExtended}
          onPress={() => navigation.navigate("TakeOrderScreen")}
          animateFrom={"right"}
          iconMode={"dynamic"}
          color="#fff"
          style={[styles.fabStyle]}
        />
      ) : null}
      {/*<View
        style={{
          bottom: "8%",
          position: "absolute",
          justifyContent: "center",
          backgroundColor: "#fff",
          width: widthScreen * 1,
          height: heightScrenn * 0.18,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "green",
          }}
          onPress={createOrder}
        >
          <Text style={{ margin: 10, textAlign: "center" }}>
            Pagar {fullPrice === 0 ? null : fullPrice}
          </Text>
        </Pressable>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    backgroundColor: "#fff",
  },
  fabStyle: {
    bottom: heightScrenn * 0.03,
    //right: 16,
    left: 16,
    backgroundColor: palette.primary,
    color: "green",
    position: "absolute",
  },
});
