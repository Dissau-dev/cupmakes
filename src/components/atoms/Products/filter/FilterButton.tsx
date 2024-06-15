import {
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

import { useGetAllCategoriesQuery } from "../../../../store/api/productsApi";
import {
  fetchProducts,
  setFilters,
} from "../../../../store/slices/productSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { widthScreen } from "../../../../theme/styles/global";
import { TopDialog } from "./TopDialog";

interface Props {
  visible: boolean;
  selectedCategories: any;
  setSelectedCategories: any;
  priceRange: any;
  selectedRating: any;
  showDialog: any;
  hideDialog: any;
  applyFilters: any;
}

export const FilterButton = ({
  visible,
  selectedCategories,
  setSelectedCategories,
  applyFilters,
  showDialog,
  hideDialog,
}: Props) => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <IconButton
        // <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
        icon={() => <AntDesign name="filter" size={24} color="black" />}
        iconColor={palette.darkGray}
        disabled
        size={20}
        onPress={showDialog}
      />
    );
  }
  return (
    <>
      <IconButton
        // <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
        icon={() => <AntDesign name="filter" size={24} color="black" />}
        iconColor={palette.darkGray}
        size={20}
        onPress={showDialog}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Dialog.Title style={{ fontFamily: "Avanta-Medium", fontSize: 28 }}>
            Filter By :
          </Dialog.Title>
          <Divider />
          <Dialog.Content>
            <View style={{ padding: 20 }}>
              <Text>Filtrar por Categorías</Text>
              {/* Suponiendo que categories es un array de categorías disponibles */}
              {categories.map((category) => (
                <View
                  key={category.id}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Checkbox
                    status={
                      selectedCategories.includes(category.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      const newSelectedCategories = selectedCategories.includes(
                        category.id
                      )
                        ? selectedCategories.filter((id) => id !== category.id)
                        : [...selectedCategories, category.id];
                      setSelectedCategories(newSelectedCategories);
                    }}
                  />
                  <Text>{category.name}</Text>
                </View>
              ))}

              <Button title="Aplicar Filtros" onPress={applyFilters} />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable onPress={hideDialog}>
              <Text>Cerrar</Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
