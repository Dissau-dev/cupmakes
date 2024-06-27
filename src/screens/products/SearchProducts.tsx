import { ProductsParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSearchedProducts } from "../../store/slices/productSlice";
import { ActivityIndicator } from "react-native-paper";

interface ProtectedScreenProps
  extends StackScreenProps<ProductsParamList, "SearchProducts"> {}

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { searchedItems, searchStatus } = useAppSelector(
    (state) => state.products
  );

  const handleSearch = () => {
    dispatch(fetchSearchedProducts(searchQuery));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Buscar productos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {searchStatus === "loading" && <ActivityIndicator size="large" />}
      <FlatList
        data={searchedItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
