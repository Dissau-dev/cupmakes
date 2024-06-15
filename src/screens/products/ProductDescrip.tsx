import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
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

interface ScreenProps
  extends StackScreenProps<ProductsParamList, "ProductDescrip"> {}

export const ProductDescrip = ({ navigation, route }: ScreenProps) => {
  const dispatch = useAppDispatch();

  const { id } = route.params;

  const { data: item, isLoading } = useGetProductByIdQuery(id);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [count, setcount] = useState(1);

  if (isLoading) {
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
      </ScrollView>
    </View>
  );
};
