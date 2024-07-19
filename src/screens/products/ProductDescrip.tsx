import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { HomeParamList, ProductsParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import {
  useGetProductByCategoryQuery,
  useGetProductByIdQuery,
} from "../../store/api/productsApi";
import { palette } from "../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addLineItems, addProduct } from "../../store/slices/cartSlice";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import StarRating from "../../components/atoms/StarRating";

import Animation from "../../../assets/looties/Loading2.json";

import Lottie from "lottie-react-native";
import { Description } from "../../components/atoms/Products/Description";
import { ProductRelated } from "../../components/atoms/Products/ProductRelated";
import { RelatedProductsList } from "../../components/atoms/Products/RelatedProductsList";

interface ScreenProps
  extends StackScreenProps<ProductsParamList, "ProductDescrip"> {}

export const ProductDescrip = ({ navigation, route }: ScreenProps) => {
  const { id } = route.params;
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(id);
  const [relatedIds, setRelatedIds] = useState([]);

  useEffect(() => {
    if (product) {
      setRelatedIds(product.related_ids || []);
    }
  }, [product]);

  if (productLoading) {
    return (
      <View>
        <FocusAwareStatusBar
          barStyle={"default"}
          backgroundColor={palette.primary}
          translucent={false}
        />

        <Lottie
          source={Animation}
          autoPlay
          loop
          style={{
            width: widthScreen * 1,
            height: heightScrenn * 0.68,
            alignSelf: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"light-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <Description item={product} />
        <View style={{ marginTop: 10 }} />

        <RelatedProductsList relatedIds={relatedIds} />
        <View style={{ height: heightScrenn * 0.05 }} />
      </ScrollView>
    </View>
  );
};
