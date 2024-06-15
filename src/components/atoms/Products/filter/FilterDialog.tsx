import React, { useState, useRef } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import {
  Dialog,
  Checkbox,
  TextInput,
  Button,
  Portal,
  IconButton,
  Divider,
} from "react-native-paper";

import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";

interface FiltersDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  categoriesData: any[];
}

const FiltersDialog: React.FC<FiltersDialogProps> = ({
  visible,
  setVisible,
  categoriesData,
}) => {
  const [filterSection, setFilterSection] = useState<
    "main" | "categories" | "rating" | "price"
  >("main");
  const [tempSelectedCategories, setTempSelectedCategories] = useState<
    number[]
  >([]);
  const [tempSelectedRating, setTempSelectedRating] = useState<number | null>(
    null
  );
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");

  const filterCategories = () => {
    return categoriesData?.filter((category) =>
      category.name.toLowerCase().includes(searchCategoryQuery.toLowerCase())
    );
  };

  const handleApplyFilters = () => {
    setVisible(false);
    // Dispatch filters
  };

  const handleResetFilters = () => {
    setTempSelectedCategories([]);
    setTempSelectedRating(null);
    setTempPriceRange([0, 1000]);
    setVisible(false);
    // Reset filters
  };

  const handleSelectCategory = (categoryId: number) => {
    if (tempSelectedCategories.includes(categoryId)) {
      setTempSelectedCategories(
        tempSelectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setTempSelectedCategories([...tempSelectedCategories, categoryId]);
    }
  };

  const renderFilterSection = () => {
    switch (filterSection) {
      case "categories":
        return (
          <>
            <FlatList
              data={filterCategories()}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoriesBtn}>
                  <Text style={styles.textCategory}>{item.name}</Text>
                  <Checkbox
                    status={
                      tempSelectedCategories.includes(item.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleSelectCategory(item.id)}
                  />
                </View>
              )}
            />
            <Button onPress={() => setFilterSection("main")}>Back</Button>
          </>
        );
      case "rating":
        return (
          <>
            {/* Rating filter UI */}
            <Button onPress={() => setFilterSection("main")}>Back</Button>
          </>
        );
      case "price":
        return (
          <>
            <TextInput
              label="Min Price"
              keyboardType="numeric"
              value={tempPriceRange[0].toString()}
              onChangeText={(value) =>
                setTempPriceRange([Number(value), tempPriceRange[1]])
              }
            />
            <TextInput
              label="Max Price"
              keyboardType="numeric"
              value={tempPriceRange[1].toString()}
              onChangeText={(value) =>
                setTempPriceRange([tempPriceRange[0], Number(value)])
              }
            />
            <Button onPress={() => setFilterSection("main")}>Back</Button>
          </>
        );
      case "main":
      default:
        return (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button onPress={() => setFilterSection("categories")}>
                Categories
              </Button>
              <Button onPress={() => setFilterSection("rating")}>Rating</Button>
              <Button onPress={() => setFilterSection("price")}>Price</Button>
            </View>
            <Divider />
            <Button onPress={handleApplyFilters}>Apply</Button>
            <Button onPress={handleResetFilters}>Reset</Button>
          </>
        );
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ height: heightScrenn * 0.75 }}
      >
        <View style={{ height: heightScrenn * 0.75, width: widthScreen }}>
          {renderFilterSection()}
        </View>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#d8d8d8",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#050505",
    borderRadius: 10,
    height: heightScrenn * 0.05,
    margin: 2,
  },
  chipText: { fontSize: 12, color: palette.darkGray },
  cleanBtn: {
    backgroundColor: palette.secondary,
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 6,
  },
  cleanText: {
    color: "#fff",
    fontSize: 16,
  },
  categoriesBtn: {
    borderRadius: 10,
    paddingHorizontal: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    alignItems: "flex-start",
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderColor: "#c1c1c1",
    shadowColor: "#000",
    marginTop: 6,
  },
  textCategory: {
    color: "#000",
    textAlign: "left",
    fontFamily: "Avanta-Medium",
    fontSize: 22,
  },
  backBtn: {
    borderRadius: 10,
    paddingHorizontal: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    alignItems: "flex-start",
    paddingTop: 10,
    shadowColor: "#000",
    marginTop: 6,
  },
  textBackBtn: {
    color: "#000",
    textAlign: "left",
    fontFamily: "Avanta-Medium",
    fontSize: 20,
  },
  aplyBtn: {
    backgroundColor: palette.secondary,
    marginVertical: 10,
    alignSelf: "center",
    width: widthScreen * 0.8,
  },
  aplyText: {
    fontSize: 22,
    color: palette.white,
    fontFamily: "Avanta-Medium",
  },
  titleList: {
    fontFamily: "Avanta-Medium",
    fontSize: 22,
    marginTop: heightScrenn * 0.02,
  },
  titleCategory: {
    fontFamily: "Avanta-Medium",
    fontSize: 18,
  },
});

export default FiltersDialog;
