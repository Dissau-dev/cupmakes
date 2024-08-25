import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextInputControllerHolderName from "../../formControls/TextInputControllerHolderName";
import { Button, Divider, TextInput } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";
import { useForm } from "react-hook-form";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import CheckBoxController from "../../formControls/CheckBoxController";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import {
  removeItem,
  selectProducts,
  setQuantity,
} from "../../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

interface Props {
  item: any;
}
interface InputValues {
  [key: string]: string;
}

export const ModalCartContent = ({ item }: Props) => {
  const products = useAppSelector(selectProducts);
  const initialInputValues: InputValues = products.reduce((acc, product) => {
    acc[product.id] = product.quantity.toString();
    return acc;
  }, {} as InputValues);


  const [selectedItemKey, setSelectedItemKey] = useState(null);
  const [inputValues, setInputValues] =
    useState<InputValues>(initialInputValues);
 
  const dispatch = useAppDispatch();

  const onHandleInput = (value: string, item: { id: any }) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [item.id]: value.replace(/[^0-9]/g, "").toString(),
    }));
    const quantity = parseInt(value);
    setSelectedItemKey(null);
    if (quantity === 0) {
      dispatch(removeItem(item.id));
    } else if (!isNaN(quantity)) {
      console.log("se despachò");
      // Despachar la acción setQuantity cuando se ingresan cambios válidos en el input
      dispatch(setQuantity({ id: item.id, quantity }));
    }
  };

  const data = Array.from({ length: 100 }, (_, index) => ({
    key: index.toString(),
    number: index === 0 ? "0 (Delete)" : index.toString(),
  }));
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      quantity: "",
    },
  });

  const handlePress = (itemKey: React.SetStateAction<null> | any) => {
    const quantity = itemKey;
    console.log(itemKey);
    if (parseInt(itemKey) === 0) {
      dispatch(removeItem(item.id));
    }
    if (selectedItemKey === itemKey) {
      setSelectedItemKey(null);
    } else {
      dispatch(setQuantity({ id: item.id, quantity }));
      setSelectedItemKey(itemKey);
      setInputValues((prevValues) => ({
        ...prevValues,
        [item.id]: quantity,
      }));
    }
  };
  console.log(selectedItemKey);

  const renderItem = ({ item }: any) => (
    <>
      <TouchableOpacity
        onPress={() => handlePress(parseInt(item.key))}
        style={[styles.touchableOpacity]}
      >
        <Text
          style={[
            styles.text,
            parseInt(item.key) === selectedItemKey && styles.selected,
          ]}
        >
          {item.number}
        </Text>
        {parseInt(item.key) === selectedItemKey && (
          <MaterialIcons name="done" size={24} color={palette.secondary} />
        )}
      </TouchableOpacity>
      <Divider />
    </>
  );

  return (
    <View>
      <View style={{ marginBottom: heightScrenn * 0.12 }}>
        <FlatList
          ListHeaderComponent={
            <TextInputControllerHolderName
              controller={{
                name: "quantity",
                rules: {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Ingresa solo números enteros",
                  },
                },
                control: control as any,
              }}
              //@ts-ignore
              value={inputValues[item.id]}
              onChangeText={(inputValues) => onHandleInput(inputValues, item)}
              defaultValue={item.quantity.toString()}
              activeOutlineColor={palette.secondary}
              style={{
                width: widthScreen * 0.8,
                alignSelf: "center",
                marginTop: heightScrenn * 0.03,
              }}
              placeholder="Enter the quantity"
              dense
              left={
                <TextInput.Icon
                  icon={() => (
                    <View
                      style={{
                        borderRightWidth: 1,
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Avanta-Medium", fontSize: 12 }}
                      >
                        Quantity
                      </Text>
                    </View>
                  )}
                  color={(isTextInputFocused) => "#c1c1c1"}
                />
              }
              autoCapitalize={"none"}
              keyboardType="numeric"
              returnKeyType="next"
            />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    fontFamily: "Avanta-Medium",
    fontSize: 24,
  },
  selected: {
    color: palette.secondary,
  },
});
