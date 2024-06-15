import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { widthScreen } from "../../../theme/styles/global";
import moment from "moment";

interface Prop {
  onPress?: () => void;
  images: string;
  name: string;
  price: number;
  date?: string;
}
export const ProductList = ({ onPress, images, name, price, date }: Prop) => {
  return (
    <TouchableOpacity>
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
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
