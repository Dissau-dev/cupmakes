import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";
import StarRating from "../../StarRating";
import TextInputControllerHolderName from "../../formControls/TextInputControllerHolderName";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";

interface Props {
  filterSection: any;
  setFilterSection: any;
  categoriesData: any;
  stylesP: any;
  tempSelectedCategories: any;
  searchCategoryQuery: any;
  setSearchCategoryQuery: any;
  setTempSelectedCategories: any;
  tempPriceRange: any;
  setTempPriceRange: any;
  tempSelectedRating: any;
  setTempSelectedRating: any;
  isLoading: any;
}
export const DialogContent = ({
  tempPriceRange,
  setTempPriceRange,
  setTempSelectedCategories,
  setTempSelectedRating,
  tempSelectedRating,
  setFilterSection,
  isLoading,
  filterSection,
  stylesP,
  categoriesData,
  tempSelectedCategories,
  searchCategoryQuery,
  setSearchCategoryQuery,
}: Props) => {
  const filterCategories = categoriesData?.filter(
    (category: { name: string }) =>
      category.name.toLowerCase().includes(searchCategoryQuery.toLowerCase())
  );
  const { control } = useForm({
    defaultValues: {
      minPrice: "0",
      maxPrice: "1000",
      searchCategory: "",
      goblalSearch: "",
    },
  });
  switch (filterSection) {
    case "categories":
      return (
        <View style={{ marginVertical: heightScrenn * 0.04 }}>
          <TextInputControllerHolderName
            controller={{
              name: "searchCategory",
              control: control as any,
            }}
            placeholder="Search Categories"
            keyboardType="web-search"
            value={searchCategoryQuery}
            onChangeText={(text) => setSearchCategoryQuery(text)}
            dense
            activeOutlineColor={palette.secondary}
            autoCapitalize={"none"}
            returnKeyType="next"
            style={{ width: widthScreen * 0.9 }}
            left={
              <TextInput.Icon
                icon={() => (
                  <Fontisto name="search" size={22} color="#c1c1c1" />
                )}
                color={(isTextInputFocused) => "#c1c1c1"}
              />
            }
          />

          {categoriesData && (
            <FlatList
              data={filterCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Checkbox
                    color={palette.secondary}
                    uncheckedColor="#c1c1c1"
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
                            (id: any) => id !== item.id
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
        </View>
      );
    case "rating":
      return (
        <View style={{ marginVertical: heightScrenn * 0.04 }}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <View
              key={rating}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Checkbox
                uncheckedColor="#c1c1c1"
                color={palette.secondary}
                status={tempSelectedRating === rating ? "checked" : "unchecked"}
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
        <View
          style={{
            marginVertical: heightScrenn * 0.04,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Text style={stylesP.textPrice}>Min Price :</Text>
          <TextInputControllerHolderName
            controller={{
              name: "minPrice",
              rules: {
                required: {
                  value: true,
                  message: "Min price required",
                },
              },
              control: control as any,
            }}
            value={tempPriceRange[0].toString()}
            onChangeText={(text) =>
              setTempPriceRange([parseInt(text) || 0, tempPriceRange[1]])
            }
            placeholder="Min price"
            dense
            activeOutlineColor={palette.secondary}
            autoCapitalize={"none"}
            keyboardType="numeric"
            returnKeyType="next"
            style={[stylesP.inputPrice]}
          />
          <Text style={stylesP.textPrice}>Max Price :</Text>
          <TextInputControllerHolderName
            controller={{
              name: "maxPrice",
              rules: {
                required: {
                  value: true,
                  message: "Max price required",
                },
              },
              control: control as any,
            }}
            value={tempPriceRange[1].toString()}
            onChangeText={(text) =>
              setTempPriceRange([tempPriceRange[0], parseInt(text) || 0])
            }
            placeholder="Max price"
            dense
            activeOutlineColor={palette.secondary}
            autoCapitalize={"none"}
            keyboardType="numeric"
            returnKeyType="next"
            style={stylesP.inputPrice}
          />
        </View>
      );
    case "main":
    default:
      return (
        <View>
          <Button
            disabled={isLoading}
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
