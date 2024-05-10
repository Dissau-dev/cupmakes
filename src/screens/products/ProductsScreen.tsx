import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { HomeParamList, ProductsParamList } from "../../routes/types";
import { useGetAllProductsQuery } from "../../store/api/productsApi";
import { palette } from "../../theme/colors";
import { useAppDispatch } from "../../store/hooks";
import { addLineItems, addProduct } from "../../store/slices/cartSlice";

interface ProtectedScreenProps
  extends StackScreenProps<ProductsParamList, "ProductsScreen"> {}

export const ProductsScreen = () => {
  const { isLoading, data } = useGetAllProductsQuery();

  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  const handleAddToCart = (item: any) => {
    const { id, name, price } = item;
    const quantity = 1;

    dispatch(addProduct({ id, name, price, quantity }));
    dispatch(addLineItems({ id, quantity }));
  };

  return (
    <View>
      <FlatList
        //@ts-ignore
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 2,
              marginTop: 10,
              paddingHorizontal: 10,
              height: 50,
              alignItems: "center",
              width: 200,
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>$ {item.price}</Text>
            </View>
            <Pressable
              style={{ backgroundColor: palette.secondary }}
              onPress={() => handleAddToCart(item)}
            >
              <Text
                style={{
                  color: "#fff",
                  width: 50,
                  textAlign: "center",
                  paddingVertical: 4,
                }}
              >
                Add
              </Text>
            </Pressable>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
