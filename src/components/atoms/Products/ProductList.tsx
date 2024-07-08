import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { widthScreen } from "../../../theme/styles/global";
import moment from "moment";
import { useAppDispatch } from "../../../store/hooks";
import { addLineItems, addProduct } from "../../../store/slices/cartSlice";

interface Prop {
  onPress?: () => void;
  images: string;
  name: string;
  price: number;
  date?: string;
  item: any;
}
export const ProductList = ({
  onPress,
  images,
  name,
  price,
  date,
  item,
}: Prop) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = (item: any) => {
    const { id, name, price, images } = item;
    const quantity = 1;
    const totalItemPrice = price * quantity;
    const product_id = id;
    setTimeout(() => {
      dispatch(
        addProduct({ id, name, price, quantity, images, totalItemPrice })
      );
      dispatch(addLineItems({ product_id, quantity }));
    }, 200);
  };
  return (
    <View
      style={{
        //   borderWidth: 2,
        // marginHorizontal: 10,

        // alignItems: "center",
        width: widthScreen * 1,
        // marginVertical: 10,
        // alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        // backgroundColor: "#f4f7f78d",
        borderBottomWidth: 0.5,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          src={images}
          style={{
            width: widthScreen * 0.3,
            height: 100,
            alignSelf: "center",
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: palette.secondary,
              marginBottom: 6,
              fontSize: 20,
            }}
          >
            {name}
          </Text>
          {/* <Text>{item.short_description}</Text> */}
          <Text style={{ fontFamily: "Avanta-Bold", fontSize: 18 }}>
            $ {price}
          </Text>
          <Text
            style={{
              fontFamily: "Avanta-Bold",
              fontSize: 18,
              color: palette.darkGray,
            }}
          >
            {moment(date).format("MMM DD, YYYY")}
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: "center", marginRight: 26 }}>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={{
            backgroundColor: palette.secondary,
            borderRadius: 10,
            padding: 6,
          }}
        >
          <Text
            style={{
              color: palette.white,
              fontFamily: "Avanta-Medium",
              fontSize: 20,
            }}
          >
            {" "}
            <Ionicons name="cart" size={16} />
            {"  "}Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
