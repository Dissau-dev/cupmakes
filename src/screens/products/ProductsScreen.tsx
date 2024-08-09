import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ProductsParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Baner } from "../../components/atoms/Baner";
import { ProductsItem } from "../../components/atoms/Products/ProductsItem";
import {
  Dialog,
  Divider,
  IconButton,
  Portal,
  Button,
} from "react-native-paper";
import {
  fetchProducts,
  selectCurrentData,
  setFilters,
} from "../../store/slices/productSlice";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { useGetAllCategoriesQuery } from "../../store/api/productsApi";

import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";

import { ProductsEmpty } from "../../components/atoms/Products/ProductsEmpty";
import { DialogContent } from "../../components/atoms/Products/filter/DialogContent";
import { ProductsHeader } from "../../components/atoms/Products/filter/ProductsHeader";

interface ProtectedScreenProps
  extends StackScreenProps<ProductsParamList, "ProductsScreen"> {}

export const ProductsScreen = ({ navigation }: ProtectedScreenProps) => {
  const dispatch = useAppDispatch();
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery();
  const { items, page, status, totalPages } = useAppSelector(selectCurrentData);

  // Estados temporales para filtros
  const [tempSelectedCategories, setTempSelectedCategories] = useState<
    number[]
  >([]);
  const [tempSelectedRating, setTempSelectedRating] = useState<number | null>(
    null
  );
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [tempSearch, setTempSearch] = useState<string>("");

  // Estados finales para filtros
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [search, setSearch] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filterSection, setFilterSection] = useState<
    "main" | "categories" | "rating" | "price"
  >("main");
  const [categories, setCategories] = useState(categoriesData);
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    // Restaurar los estados temporales a los finales cuando se cierra el diálogo
    setTempSelectedCategories(selectedCategories);
    setTempSelectedRating(selectedRating);
    setTempPriceRange(priceRange);
    setTempSearch(search);
    setVisible(false);
  };

  useEffect(() => {
    dispatch(fetchProducts(1)); // Cargar la primera página al montar el componente
  }, [dispatch]);

  const { control } = useForm({
    defaultValues: {
      goblalSearch: "",
    },
  });

  const applyLocalFilters = () => {
    let filtered = [...items];
    {
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((item) =>
          selectedCategories.includes(item.categories[0].id)
        );
      }
      if (selectedRating !== null) {
        filtered = filtered.filter(
          (item) => item.average_rating >= selectedRating
        );
      }
      if (priceRange) {
        filtered = filtered.filter(
          (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
        );
      }
      if (search) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }
    //@ts-ignore
    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyLocalFilters();
  }, [items, selectedCategories, selectedRating, priceRange, search]);

  const loadMoreProducts = () => {
    if (status === "succeeded" && page < totalPages) {
      dispatch(fetchProducts(page + 1));
    }
  };

  const applyFilters = () => {
    // Aplicar los estados temporales a los finales
    setSelectedCategories(tempSelectedCategories);
    setSelectedRating(tempSelectedRating);
    setPriceRange(tempPriceRange);
    setSearch(tempSearch);

    const filters = {
      categories: tempSelectedCategories,
      rating: tempSelectedRating,
      priceRange: tempPriceRange,
      search: tempSearch,
    };
    dispatch(setFilters(filters));
    dispatch(fetchProducts(1)); // Reiniciar la carga de productos con los nuevos filtros
    setVisible(false);
  };

  const clearFilters = () => {
    setShowSearch(false);
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange([0, 1000]);
    setSearch("");
    setTempSelectedCategories([]);
    setTempSelectedRating(null);
    setTempPriceRange([0, 1000]);
    setTempSearch("");
    const filters = {
      categories: [],
      rating: null,
      min_price: 0,
      max_price: 1000,
      search: "",
    };
    dispatch(setFilters(filters));
    dispatch(fetchProducts(1));
  };

  const removeCategoryFilter = (id: number) => {
    setSelectedCategories(
      selectedCategories.filter((categoryId) => categoryId !== id)
    );
    setTempSelectedCategories(
      selectedCategories.filter((categoryId) => categoryId !== id)
    );
  };

  const removeRatingFilter = () => {
    setSelectedRating(null);
    setTempSelectedRating(null);
    const filters = {
      categories: selectedCategories,
      rating: null,
      min_price: priceRange[0],
      max_price: priceRange[1],
      search: search,
    };
    dispatch(setFilters(filters));
    dispatch(fetchProducts(1));
  };

  const removePriceFilter = () => {
    setPriceRange([0, 1000]);
    setTempPriceRange([0, 1000]);
    const filters = {
      categories: selectedCategories,
      rating: selectedRating,
      min_price: 0,
      max_price: 1000,
      search: search,
    };
    dispatch(setFilters(filters));
    dispatch(fetchProducts(1));
  };

  const renderFooter = () => {
    if ((isLoading || status === "loading") && items.length !== 0) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color={palette.darkGray} />
        </View>
      );
    }
  };

  const onChangeSearch = (text: string) => {
    setTempSearch(text);
    setTimeout(() => {
      setSearch(text);
    }, 1000);
  };

  const onDeleteSearch = () => {
    setShowSearch(!showSearch);
    setSearch(""), setTempSearch("");
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Baner />

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor: "#f7ffff",
            position: "absolute",
            top: 0,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={filterSection === "main" ? true : false}
              style={{ justifyContent: "center" }}
              onPress={() => setFilterSection("main")}
            >
              <Text style={{ marginLeft: 10 }}>
                {filterSection === "main" ? null : (
                  <Ionicons name="chevron-back" size={22} color={"#000"} />
                )}
                {"  "}
                <Dialog.Title
                  style={{ fontFamily: "Avanta-Medium", fontSize: 28 }}
                >
                  {filterSection === "main"
                    ? "Filter options:"
                    : filterSection.charAt(0).toUpperCase() +
                      filterSection.slice(1)}
                </Dialog.Title>
              </Text>
            </TouchableOpacity>

            <IconButton
              icon="close"
              iconColor={"#000"}
              size={24}
              onPress={hideDialog}
            />
          </View>

          <Divider />

          <Dialog.Content>
            {
              <DialogContent
                stylesP={stylesP}
                searchCategoryQuery={searchCategoryQuery}
                setFilterSection={setFilterSection}
                setTempPriceRange={setTempPriceRange}
                setSearchCategoryQuery={setSearchCategoryQuery}
                tempSelectedRating={tempSelectedRating}
                tempPriceRange={tempPriceRange}
                setTempSelectedRating={setTempSelectedRating}
                tempSelectedCategories={tempSelectedCategories}
                setTempSelectedCategories={setTempSelectedCategories}
                categoriesData={categoriesData}
                isLoading={isLoading}
                filterSection={filterSection}
              />
            }

            {filterSection !== "main" && (
              <Button
                onPress={applyFilters}
                style={stylesP.aplyBtn}
                rippleColor={"#fdfdfd4c"}
              >
                <Text style={stylesP.aplyText}>Filter</Text>
              </Button>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
      <View style={{ marginBottom: heightScrenn * 0.07, zIndex: 0 }}>
        <FlatList
          data={filteredItems.slice(0, page * 10)} // Mostrar solo los elementos correspondientes a las páginas cargadas
          //@ts-ignore
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductsItem
              item={item}
              onpress={() =>
                navigation.navigate("ProductDescrip", {
                  //@ts-ignore
                  id: item.id,
                  item: item,
                  //@ts-ignore
                  titleScreen: item.name,
                })
              }
            />
          )}
          ListFooterComponent={renderFooter}
          numColumns={2}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ProductsEmpty isLoading={isLoading} status={status} />
          }
          ListHeaderComponent={
            <ProductsHeader
              categoriesData={categoriesData}
              selectedRating={selectedRating}
              showDialog={showDialog}
              showSearch={showSearch}
              stylesP={stylesP}
              tempSearch={tempSearch}
              onDeleteSearch={onDeleteSearch}
              search={search}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              removeCategoryFilter={removeCategoryFilter}
              removePriceFilter={removePriceFilter}
              removeRatingFilter={removeRatingFilter}
              clearFilters={clearFilters}
              onChangeSearch={onChangeSearch}
            />
          }
        />
      </View>
    </View>
  );
};

const stylesP = StyleSheet.create({
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
    fontSize: 18,
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
    fontSize: 20,
  },
  inputPrice: {
    width: widthScreen * 0.4,
    marginBottom: 10,
  },
  textPrice: {
    fontFamily: "Avanta-Medium",
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "center",
    width: widthScreen * 0.3,
  },
});
