import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { Products } from "../../../services/Interfaces";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import StarRating from "../StarRating";
import { addLineItems, addProduct } from "../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigation } from "@react-navigation/native";

import { ModalComponent } from "../ModalComponent";
import {
  addLikedProduct,
  productsInterface,
  removeLikedItem,
  selectWitches,
} from "../../../store/slices/witchesSlice";

interface Props {
  item: Products;
}
export const Description = ({ item }: Props) => {
  const [count, setcount] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  const currentWitches = useAppSelector(selectWitches);
  const [heart, setHeart] = useState(false);

  const onLikedProduct = (item: productsInterface) => {
    const { id, name, price, images } = item;
    if (heart) {
      dispatch(removeLikedItem(item.id));
      setHeart(false);
    } else {
      setHeart(true);
      const date = new Date();
      const serializableDate = date.toISOString();
      dispatch(
        addLikedProduct({
          id,
          name,
          price,
          images,
          date: serializableDate,
        })
      );
    }
  };

  useEffect(() => {
    setHeart(currentWitches.some((product) => product.id === item.id));
  }, [currentWitches, item.id]);

  const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const increment = () => {
    setcount(count + 1);
    if (count === 1) {
      setDisabled(false);
    }
  };
  const setQuantityCounter = (quantity: any) => {
    setcount(quantity);
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
    console.log(totalItemPrice);
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
        backgroundColor: "#fff",
        borderRadius: 10,
        alignSelf: "center",
        width: widthScreen * 0.9,
        padding: 16,
        shadowColor: "#000",
        marginTop: heightScrenn * 0.02,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 10, left: 10 }}
        //@ts-ignore
        onPress={() => navigation.navigate("ProductsScreen")}
      >
        <Ionicons name="arrow-back" size={36} color={"#c1c1c1"} />
      </TouchableOpacity>

      <Image
        src={item.images[0].src}
        style={{
          width: widthScreen * 0.8,
          height: heightScrenn * 0.3,
          alignSelf: "center",
        }}
      />
      <TouchableOpacity
        onPress={() => onLikedProduct(item)}
        style={{ position: "absolute", alignSelf: "flex-end" }}
      >
        {heart ? (
          <Ionicons
            name="heart-sharp"
            size={48}
            style={{ margin: 20 }}
            color={palette.lightRed}
          />
        ) : (
          <Ionicons name="heart-outline" size={48} style={{ margin: 20 }} />
        )}
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor:
              item.stock_status === "instock" ? "#83d964" : "#d96464",
            padding: 6,
            width: widthScreen * 0.2,

            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Avanta-Medium",
              textAlign: "center",
            }}
          >
            {item.stock_status}
          </Text>
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
            fontSize: 22,
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
            fontFamily: "Montserrat-Thin",
            fontSize: 16,
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
                borderWidth: 0.7,
                borderColor: "#c1c1c1",
                borderRadius: 10,
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
              disabled={count === 1}
              onPress={decrement}
            >
              <AntDesign
                name="minus"
                size={25}
                color={count === 1 ? "#ccc" : palette.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showModal}
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
            </TouchableOpacity>
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
              backgroundColor: palette.primary,
              justifyContent: "center",
              padding: 6,
              borderRadius: 10,
              marginHorizontal: 20,
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Avanta-Medium",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <Fontisto name="shopping-bag" size={20} />
              {"  "}
              Add To cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalComponent
        isCart={false}
        item={item}
        titleModal="Select Quantity"
        onClose={hideModal}
        visible={modalVisible}
        count={count}
        setQuantity={setQuantityCounter}
        increment={increment}
        decrement={decrement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    left: widthScreen * -0.1,
    top: 18,
    width: 14,
    height: 14,
    borderRadius: 15,
    backgroundColor: palette.primary,
  },
});
