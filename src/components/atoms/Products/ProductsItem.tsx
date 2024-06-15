import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import { palette } from "../../../theme/colors";
import { Image } from "expo-image";
import { Products } from "../../../services/Interfaces";
import { Description } from "./Description";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { lightTheme } from "../../../theme/colors/index";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addLikedProduct,
  productsInterface,
  removeLikedItem,
  selectWitches,
} from "../../../store/slices/witchesSlice";

interface Props {
  onpress: () => void;
  item: any;
}
export const ProductsItem = ({ onpress, item }: Props) => {
  const dispatch = useAppDispatch();
  const currentWitches = useAppSelector(selectWitches);
  const [heart, setHeart] = useState(false);
  const ImagenPorDefecto = () => (
    <Image
      source={require("../../../../assets/genericImage.jpg")}
      style={{
        width: widthScreen * 0.4,
        height: heightScrenn * 0.135,
        alignSelf: "center",
        borderRadius: 10,
      }}
    />
  );
  const onHeart = () => {
    setHeart(!heart);
  };

  const onLikedProduct = (item: productsInterface) => {
    const { id, name, price, images } = item;
    if (heart) {
      const likeStatus = "unliked";
      dispatch(removeLikedItem(item.id));
      setHeart(false);
    } else {
      const likeStatus = "liked";
      setHeart(true);
      const date = new Date();
      const serializableDate = date.toISOString();
      dispatch(
        addLikedProduct({
          id,
          name,
          price,
          images,
          likeStatus,
          date: serializableDate,
        })
      );
    }
  };

  useEffect(() => {
    if (!heart)
      currentWitches.forEach((element: { id: number }) => {
        if (element.id === item.id) {
          setHeart(true);
        }
      });
  }, [heart]);

  return (
    <Pressable>
      <View style={styles.card}>
        {item.images.length > 0 ? (
          <View>
            <Image
              source={{ uri: item.images[0].src }}
              style={{
                width: widthScreen * 0.4,
                height: heightScrenn * 0.135,
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
                  size={24}
                  style={{}}
                  color={palette.lightRed}
                />
              ) : (
                <Ionicons name="heart-outline" size={24} style={{}} />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <ImagenPorDefecto />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontFamily: "Avanta-Bold" }}>
              {item.name}
            </Text>
          </View>
          <View>
            <Ionicons
              name="information-circle"
              size={24}
              color="#73729A"
              onPress={onpress}
            />
          </View>
        </View>
        <View>
          <Text style={styles.textDescription}>
            {" "}
            {item.description.length > 74
              ? `${item.description
                  .replace(/^<p>/, "")
                  .replace(/<\/p>/, "")
                  .slice(0, 74)}...`
              : item.description.replace(/^<p>/, "").replace(/<\/p>/, "")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
            alignContent: "flex-end",
            alignItems: "center",

            // backgroundColor: "#c1c1c1",
          }}
        >
          <View>
            <Text style={{ fontFamily: "Avanta-Bold", fontSize: 18 }}>
              $ {item.price}
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,

              alignContent: "center",
              alignItems: "center",
              marginBottom: 10,
              paddingVertical: 3,
              justifyContent: "center",
              height: heightScrenn * 0.04,
              width: widthScreen * 0.13,
              shadowColor: "#000",
              marginTop: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Avanta-Bold",
                color: palette.primary,
                textAlignVertical: "center",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              <Fontisto name="shopping-bag" size={14} color={palette.primary} />
              {"  "}
              ADD
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.44,
    marginHorizontal: 10,
    height: heightScrenn * 0.315,
    paddingVertical: 10,
    marginBottom: 10,
    paddingTop: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textTitle: {
    textAlign: "center",
    fontFamily: "Avanta-Bold",
    fontSize: 22,
    color: palette.primary,
  },
  textDescription: {
    marginHorizontal: 10,
    color: "#908f8f",
    fontFamily: "Avanta-Light",
    fontSize: 16,
    marginTop: 4,
    height: heightScrenn * 0.06,
  },
});
