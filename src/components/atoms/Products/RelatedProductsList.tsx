import React from "react";
import { useGetRelatedProductsByIdsQuery } from "../../../store/api/productsApi";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ProductRelated } from "./ProductRelated";
import { useNavigation } from "@react-navigation/native";
import { palette } from "../../../theme/colors";

interface Props {
  relatedIds: any;
}
export const RelatedProductsList = ({ relatedIds }: Props) => {
  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useGetRelatedProductsByIdsQuery(relatedIds);
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator size="large" color={palette.darkGray} />;
  }

  if (error) {
    return <Text>Error al cargar los productos relacionados</Text>;
  }
  return (
    <>
      {relatedProducts?.length === 0 ? null : (
        <View>
          <Text
            style={{
              fontSize: 22,
              marginHorizontal: 20,
              marginVertical: 10,
              fontFamily: "Avanta-Medium",
            }}
          >
            Related Products
          </Text>
        </View>
      )}
      <FlatList
        horizontal
        data={relatedProducts}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRelated
            item={item}
            onpress={() =>
              //@ts-ignore
              navigation.navigate("ProductDescrip", {
                id: item.id,
                titleScreen: item.name,
                item: item,
              })
            }
          />
        )}
      />
    </>
  );
};
