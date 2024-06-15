import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ProductsParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Baner } from "../../components/atoms/Baner";
import Lottie from "lottie-react-native";
import Animation from "../../../assets/looties/Loading2.json";
import { ProductsItem } from "../../components/atoms/Products/ProductsItem";
import {
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  Portal,
  TextInput,
  Button,
  Chip,
  Searchbar,
  List,
} from "react-native-paper";
import {
  fetchProducts,
  selectCurrentData,
  setFilters,
} from "../../store/slices/productSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useGetAllCategoriesQuery } from "../../store/api/productsApi";
import StarRating from "../../components/atoms/StarRating";
import { styles } from "../../../App";
import { Ionicons } from "@expo/vector-icons";

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
    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyLocalFilters();
    console.log(filteredItems.length);
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
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange([0, 1000]);
    setSearch("");
    setTempSelectedCategories([]);
    setTempSelectedRating(null);
    setTempPriceRange([0, 1000]);
    setTempSearch("");
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
  };

  const removePriceFilter = () => {
    setPriceRange([0, 1000]);
    setTempPriceRange([0, 1000]);
  };

  const removeSearchFilter = () => {
    setSearch("");
    setTempSearch("");
  };

  const renderFooter = () => {
    if (isLoading || status === "loading") {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color={palette.secondary} />
        </View>
      );
    }
  };

  const filterCategories = () => {
    return categories?.filter((category) =>
      category.name.toLowerCase().includes(searchCategoryQuery.toLowerCase())
    );
  };

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            margin: 10,
            maxWidth: widthScreen * 0.58,
          }}
        >
          {selectedCategories.map((id) => (
            <Button
              key={id}
              onPress={() => removeCategoryFilter(id)}
              style={stylesP.chip}
              rippleColor={"#f0ecec"}
            >
              <Text style={stylesP.chipText}>
                {categories?.find((category) => category.id === id)?.name}{" "}
                <AntDesign name="close" size={14} />
              </Text>
            </Button>
          ))}
          {selectedRating !== null && (
            <Button
              onPress={removeRatingFilter}
              style={stylesP.chip}
              rippleColor={"#f0ecec"}
            >
              <Text style={stylesP.chipText}>
                Rating: {selectedRating}
                <AntDesign name="star" size={12} />{" "}
                <AntDesign name="close" size={14} />
              </Text>
            </Button>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 1000) && (
            <Button
              onPress={removePriceFilter}
              style={stylesP.chip}
              rippleColor={"#f0ecec"}
            >
              <Text style={stylesP.chipText}>
                Price: {priceRange[0]} - {priceRange[1]}{" "}
                <AntDesign name="close" size={14} />
              </Text>
            </Button>
          )}
          {/*    {search && (
          <Chip onClose={removeSearchFilter} style={{ margin: 4 }}>
            Buscar: {search}
          </Chip>
        )}*/}
          {/*  {(selectedCategories.length > 0 ||
          selectedRating !== null ||
          priceRange[0] > 0 ||
          priceRange[1] < 1000 ||
          search) && (
          <Button onPress={clearFilters} style={stylesP.cleanBtn}>
            <Text style={stylesP.cleanText}>
              <MaterialIcons
                name="cleaning-services"
                size={20}
                color="#fff"
              />
              {"  "}Clean
            </Text>
          </Button>
        )} */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",

            marginVertical: 10,
          }}
        >
          <IconButton
            icon={() => <AntDesign name="search1" size={24} color="black" />}
            iconColor={palette.darkGray}
            size={20}
            onPress={() =>
              navigation.navigate("SearchProducts", {
                titleScreen: "Search",
              })
            }
          />
          <>
            <IconButton
              icon={() => <AntDesign name="filter" size={24} color="black" />}
              iconColor={palette.darkGray}
              size={20}
              onPress={showDialog}
            />
            {(selectedCategories.length > 0 ||
              selectedRating !== null ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000 ||
              search) && (
              <IconButton
                icon={() => <Octicons name="trash" size={24} color="black" />}
                iconColor={palette.darkGray}
                size={20}
                onPress={clearFilters}
              />
            )}
          </>
        </View>
      </View>
    );
  };

  const renderDialogContent = () => {
    switch (filterSection) {
      case "categories":
        return (
          <View style={{ marginVertical: heightScrenn * 0.04 }}>
            <TextInput
              placeholder="search"
              keyboardType="web-search"
              value={searchCategoryQuery}
              onChangeText={(text) => setSearchCategoryQuery(text)}
            />
            {categoriesData && (
              <FlatList
                data={filterCategories()} // Mostrar solo los elementos correspondientes a las páginas cargadas
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View
                    key={item.id}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Checkbox
                      color={palette.secondary}
                      status={
                        tempSelectedCategories.includes(item.id)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        const newCategories = tempSelectedCategories.includes(
                          item.id
                        )
                          ? tempSelectedCategories.filter(
                              (id) => id !== item.id
                            )
                          : [...tempSelectedCategories, item.id];
                        setTempSelectedCategories(newCategories);
                      }}
                    />
                    <Text style={stylesP.titleCategory}>{item.name}</Text>
                  </View>
                )}
              />
            )}

            {/*filterCategories()?.map(
              (category: { id: number; name: string }) => (
                <View
                  key={category.id}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Checkbox
                    color={palette.secondary}
                    status={
                      tempSelectedCategories.includes(category.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      const newCategories = tempSelectedCategories.includes(
                        category.id
                      )
                        ? tempSelectedCategories.filter(
                            (id) => id !== category.id
                          )
                        : [...tempSelectedCategories, category.id];
                      setTempSelectedCategories(newCategories);
                    }}
                  />
                  <Text style={stylesP.titleCategory}>{category.name}</Text>
                </View>
              )
            )*/}
          </View>
        );
      case "rating":
        return (
          <View style={{ marginVertical: heightScrenn * 0.04 }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <View
                key={rating}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Checkbox
                  color={palette.secondary}
                  status={
                    tempSelectedRating === rating ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setTempSelectedRating(
                      tempSelectedRating === rating ? null : rating
                    )
                  }
                />
                <StarRating rating={rating} />
              </View>
            ))}
          </View>
        );
      case "price":
        return (
          <View style={{ marginVertical: heightScrenn * 0.04 }}>
            <TextInput
              placeholder="Precio mínimo"
              keyboardType="numeric"
              value={tempPriceRange[0].toString()}
              onChangeText={(text) =>
                setTempPriceRange([parseInt(text) || 0, tempPriceRange[1]])
              }
            />
            <TextInput
              placeholder="Precio máximo"
              keyboardType="numeric"
              value={tempPriceRange[1].toString()}
              onChangeText={(text) =>
                setTempPriceRange([tempPriceRange[0], parseInt(text) || 100])
              }
            />
          </View>
        );
      case "main":
      default:
        return (
          <View>
            <Button
              onPress={() => setFilterSection("categories")}
              style={stylesP.categoriesBtn}
              labelStyle={stylesP.textCategory}
              rippleColor={"#fdfdfd"}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: widthScreen * 0.7,
                }}
              >
                <Text style={stylesP.textCategory}>By Categories</Text>

                <Ionicons name="chevron-forward" size={20} />
              </View>
            </Button>
            <Button
              onPress={() => setFilterSection("rating")}
              style={stylesP.categoriesBtn}
              labelStyle={stylesP.textCategory}
              rippleColor={"#fdfdfd4c"}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: widthScreen * 0.7,
                }}
              >
                <Text style={stylesP.textCategory}>By Rating</Text>
                <Ionicons name="chevron-forward" size={20} />
              </View>
            </Button>
            <Button
              onPress={() => setFilterSection("price")}
              style={stylesP.categoriesBtn}
              rippleColor={"#fdfdfd4c"}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: widthScreen * 0.7,
                }}
              >
                <Text style={stylesP.textCategory}> By Precio {"  "} </Text>

                <Ionicons name="chevron-forward" size={20} />
              </View>
            </Button>
          </View>
        );
    }
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
            {renderDialogContent()}

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
      <View style={{ marginBottom: heightScrenn * 0.07 }}>
        <FlatList
          data={filteredItems.slice(0, page * 10)} // Mostrar solo los elementos correspondientes a las páginas cargadas
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductsItem
              item={item}
              onpress={() =>
                navigation.navigate("ProductDescrip", {
                  id: item.id,
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
          ListHeaderComponent={renderHeader}
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
