import React from "react";
import { Text, View } from "react-native";
import TextInputControllerHolderName from "../../formControls/TextInputControllerHolderName";
import { useForm } from "react-hook-form";
import { widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";
import { Button, IconButton, TextInput } from "react-native-paper";
import { Fontisto, AntDesign, Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  search: any;
  removeCategoryFilter: any;
  removeRatingFilter: any;
  categoriesData: any;
  clearFilters: any;
  showSearch: any;
  tempSearch: any;
  onChangeSearch: any;
  onDeleteSearch: any;
  showDialog: any;
  selectedCategories: any;
  selectedRating: any;
  priceRange: any;
  removePriceFilter: any;
  stylesP: any;
}
export const ProductsHeader = ({
  clearFilters,
  removePriceFilter,
  search,
  categoriesData,
  removeCategoryFilter,
  removeRatingFilter,
  priceRange,
  selectedCategories,
  selectedRating,
  onChangeSearch,
  showSearch,
  tempSearch,
  onDeleteSearch,
  showDialog,
  stylesP,
}: Props) => {
  const { control } = useForm({
    defaultValues: {
      goblalSearch: "",
    },
  });

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginLeft: 18,
          }}
        >
          {showSearch && (
            <TextInputControllerHolderName
              controller={{
                name: "globalSearch",
                control: control as any,
              }}
              placeholder="Search Products"
              keyboardType="web-search"
              value={tempSearch}
              onChangeText={(text) => onChangeSearch(text)}
              dense
              activeOutlineColor={palette.secondary}
              autoCapitalize={"none"}
              returnKeyType="next"
              style={{
                width: widthScreen * 0.6,

                // marginTop: 14,
                // marginLeft: 6,
              }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Fontisto name="search" size={20} color="#c1c1c1" />
                  )}
                  color={(isTextInputFocused) => "#c1c1c1"}
                />
              }
            />
          )}
          <View style={{ flexDirection: "row", right: widthScreen * 0.04 }}>
            <IconButton
              icon={() => (
                <MaterialIcons
                  name={!showSearch ? "search" : "search-off"}
                  size={28}
                  color={"#424141"}
                />
              )}
              size={14}
              onPress={onDeleteSearch}
            />

            <IconButton
              icon={() => (
                <AntDesign name="filter" size={24} color={"#424141"} />
              )}
              size={14}
              onPress={showDialog}
            />
            {(selectedCategories.length > 0 ||
              selectedRating !== null ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000 ||
              search) && (
              <IconButton
                icon={() => (
                  <Octicons name="trash" size={24} color={"#424141"} />
                )}
                size={14}
                onPress={clearFilters}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          //  margin: 10,
          //  maxWidth: widthScreen * 0.,
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
              {categoriesData?.find((category) => category.id === id)?.name}{" "}
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
      </View>
    </View>
  );
};
