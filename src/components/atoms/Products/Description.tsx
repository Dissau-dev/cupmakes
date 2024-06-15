import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { Products } from "../../../services/Interfaces";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import StarRating from "../StarRating";
import { addLineItems, addProduct } from "../../../store/slices/cartSlice";
import { useAppDispatch } from "../../../store/hooks";

interface Props {
  item: Products;
}
export const Description = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const increment = () => {
    setcount(count + 1);
    if (count === 1) {
      setDisabled(false);
    }
  };
  const decrement = () => {
    if (count === 2) {
      setcount(count - 1);
      setDisabled(true);
    } else {
      setcount(count - 1);
    }
  };
  const handleAddToCart = (item: any) => {
    const { id, name, price, images } = item;
    const quantity = count;
    const totalItemPrice = quantity * price;

    dispatch(addProduct({ id, name, price, quantity, images, totalItemPrice }));
    dispatch(addLineItems({ id, quantity }));
  };
  const [disabled, setDisabled] = useState<boolean>(true);
  const [count, setcount] = useState(1);
  return (
    <View style={{ paddingBottom: heightScrenn * 0.16 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          alignSelf: "center",
          width: widthScreen * 0.9,

          //   justifyContent: "center",
          padding: 16,
          shadowColor: "#000",
          marginTop: heightScrenn * 0.06,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          src={item.images[0].src}
          style={{
            width: widthScreen * 0.8,
            height: heightScrenn * 0.37,
            alignSelf: "center",
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor:
                item.stock_status === "instock" ? "#83d964" : "#d96464",
              padding: 6,
              width: widthScreen * 0.16,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>{item.stock_status}</Text>
          </View>
          <View style={{ marginHorizontal: 40, alignSelf: "center" }}>
            <StarRating rating={item.average_rating} />
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Avanta-Medium",
              color: palette.secondary,
              marginBottom: 6,
              fontSize: 28,
              marginTop: 6,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: palette.primary,
              fontFamily: "Avanta-Medium",
              fontSize: 20,
            }}
          >
            $ {item.price}
          </Text>
          <Text
            style={{
              fontFamily: "Avanta-Light",
              fontSize: 18,
              marginTop: 6,
            }}
          >
            {item.short_description.replace(/^<p>/, "").replace(/<\/p>/, "")}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                {
                  flexDirection: "row",
                  height: 40,
                  borderWidth: 0.5,
                  borderRadius: 100,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                  backgroundColor: palette.white,
                }}
                disabled={disabled}
                onPress={decrement}
              >
                <AntDesign
                  name="minus"
                  size={25}
                  color={disabled ? "#ccc" : palette.secondary}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 40,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: palette.secondary,
                    fontSize: 18,
                    borderRightColor: "#eee",
                    borderLeftColor: "#eee",
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                  }}
                >
                  {count}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  backgroundColor: palette.white,
                }}
                onPress={increment}
              >
                <AntDesign name="plus" size={25} color={palette.secondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={{
                backgroundColor: palette.secondary,
                justifyContent: "center",
                padding: 6,
                borderRadius: 10,
                marginHorizontal: 20,
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Avanta-Bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Ionicons name="cart" size={20} />
                {"  "}
                Add To cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
