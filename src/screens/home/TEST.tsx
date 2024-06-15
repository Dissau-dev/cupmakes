import React, { useState } from "react";
import { useGetAllProductsQuery } from "../../store/api/productsApi";
import { Text, View } from "react-native";

export const TEST = () => {
  const [page, setpage] = useState(1);

  const { data, isLoading, isFetching, isSuccess } = useGetAllProductsQuery({
    page: page,
  });

  if (!data) {
    console.log(data);
  }

  return (
    <View>
      <Text>{data?.totalPages}</Text>
    </View>
  );
};
