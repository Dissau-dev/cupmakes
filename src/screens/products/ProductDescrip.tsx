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

import { heightScrenn, widthScreen } from "../../theme/styles/global";

import Animation from "../../../assets/looties/loaderSpinner.json";

import Lottie from "lottie-react-native";
import { Description } from "../../components/atoms/Products/Description";
import { RelatedProductsList } from "../../components/atoms/Products/RelatedProductsList";

interface ScreenProps
  extends StackScreenProps<ProductsParamList, "ProductDescrip"> {}

export const ProductDescrip = ({ navigation, route }: ScreenProps) => {
  const { id, item } = route.params;

  const [relatedIds, setRelatedIds] = useState([]);

  useEffect(() => {
    if (item) {
      setRelatedIds(item.related_ids || []);
    }
  }, [item]);

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
        <Description item={item} />
        <View style={{ marginTop: 10 }} />

        <RelatedProductsList relatedIds={relatedIds} />
        <View style={{ height: heightScrenn * 0.05 }} />
      </ScrollView>
    </View>
  );
};
