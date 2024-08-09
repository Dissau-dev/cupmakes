import React, { useEffect, useState } from "react";
import { palette } from "../../../theme/colors";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  addLikedProduct,
  productsInterface,
  removeLikedItem,
  selectWitches,
} from "../../../store/slices/witchesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import StarRating from "../StarRating";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onpress: () => void;
  item: any;
  isLoading?: any;
}
export const ProductRelated = ({ onpress, item, isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const currentWitches = useAppSelector(selectWitches);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    setHeart(currentWitches.some((product) => product.id === item.id));
  }, [currentWitches, item.id]);

  const ImagenPorDefecto = () => (
    <Image
      source={require("../../../../assets/genericImage.jpg")}
      style={{
        width: widthScreen * 0.4,
        height: heightScrenn * 0.12,
        alignSelf: "center",
        borderRadius: 10,
      }}
    />
  );

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

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={palette.darkGray} />
      ) : (
        <Pressable onPress={onpress}>
          <View style={styles.card}>
            {item.images.length > 0 ? (
              <View>
                <Image
                  source={{ uri: item.images[0].src }}
                  style={{
                    width: widthScreen * 0.3,
                    height: heightScrenn * 0.12,
                    alignSelf: "center",
                  }}
                />
                <TouchableOpacity
                  onPress={() => onLikedProduct(item)}
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    height: heightScrenn * 0.05,
                    width: widthScreen * 0.1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
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

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: "Avanta-Medium" }}>
                {item.name}
              </Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <StarRating
                rating={item.average_rating}
                size={16}
                fontSize={16}
              />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontFamily: "Avanta-Medium", fontSize: 16 }}>
                $ {item.price}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    zIndex: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 4,
    width: widthScreen * 0.44,
    marginHorizontal: 10,
    height: heightScrenn * 0.24,
    paddingVertical: 10,
    marginBottom: 10,
    paddingTop: 10,
    // justifyContent: "space-between",
    justifyContent: "space-around",
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
  btn: {
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
  },
  textBtn: {
    fontFamily: "Avanta-Bold",
    color: palette.primary,
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  bubble: {
    position: "absolute",
    left: widthScreen * 0.16,
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: palette.primary,
  },
});
