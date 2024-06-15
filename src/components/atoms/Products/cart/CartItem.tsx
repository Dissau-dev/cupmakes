import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectProducts,
  setQuantity,
} from "../../../../store/slices/cartSlice";
import { useForm } from "react-hook-form";
import TextInputController from "../../formControls/TextInputController";

interface Props {
  item: any;
}
export const CartItem = ({ item }: Props) => {
  const [disabled, setdisabled] = useState(false);
  const {
    setFocus,
    control,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialInputValues = {};
    products.forEach((product) => {
      //@ts-ignore
      initialInputValues[product.id] = product.quantity;
    });

    setInputValues(initialInputValues);

    //console.log(line_Items);
  }, []);

  const products = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();
  const increase = (item: any) => {
    dispatch(increaseQuantity(item.id));
    setInputValues((prevValues) => ({
      ...prevValues,
      //@ts-ignore
      [item.id]: (parseInt(inputValues[item.id]) + 1).toString(),
    }));
    //  setinputValue((parseInt(inputValue) + 1).toString());
    // settextInput((item.quantity + 1).toString());
    setdisabled(false);
  };
  const decrease = (item: any) => {
    if (item.quantity === 2) {
      dispatch(decreaseQuantity(item.id));

      setInputValues((prevValues) => ({
        ...prevValues,
        //@ts-ignore
        [item.id]: (parseInt(inputValues[item.id]) - 1).toString(),
      }));
      setdisabled(true);
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        //@ts-ignore
        [item.id]: (parseInt(inputValues[item.id]) - 1).toString(),
      }));
      dispatch(decreaseQuantity(item.id));
    }
  };
  //@ts-ignore
  const onHandleInput = (value, item) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [item.id]: value.toString(),
    }));
    const quantity = parseInt(value);
    if (!isNaN(quantity)) {
      console.log("se despachò");
      // Despachar la acción setQuantity cuando se ingresan cambios válidos en el input
      dispatch(setQuantity({ id: item.id, quantity }));
      console.log("console:" + products[0].quantity);
    }
  };
  return (
    <View
      style={{
        width: widthScreen * 1,
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#f4f7f78d",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          src={item.images[0].src}
          style={{
            width: widthScreen * 0.3,
            height: 100,
            alignSelf: "center",
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: palette.secondary,
              marginVertical: 6,
              fontFamily: "Avanta-Medium",
              fontSize: 26,
            }}
          >
            {item.name}
          </Text>
          {/* <Text>{item.short_description}</Text> */}
          <Text
            style={{
              color: palette.primary,
              fontFamily: "Avanta-Medium",
              fontSize: 20,
            }}
          >
            $ {item.price}
          </Text>
          <View style={{}}>
            <View
              style={[
                {
                  flexDirection: "row",
                  height: 40,
                  borderWidth: 0.5,
                  borderRadius: 100,
                  marginTop: 10,
                  marginBottom: 4,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                  backgroundColor: palette.white,
                }}
                disabled={item.quantity === 1}
                onPress={() => decrease(item)}
              >
                <AntDesign
                  name="minus"
                  size={25}
                  color={item.quantity === 1 ? "#ccc" : palette.secondary}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 50,
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: heightScrenn * 0.01,
                }}
              >
                <TextInputController
                  controller={{
                    name: "quantity",
                    rules: {
                      required: {
                        value: true,
                        message: "email required",
                      },
                      // validate: { validateEmail },
                    },
                    control: control as any,
                  }}
                  style={styles.input}
                  dense
                  outlineStyle={{
                    borderRadius: 10,
                    backgroundColor: palette.white,
                  }}
                  activeOutlineColor={palette.secondary}
                  //@ts-ignore
                  value={inputValues[item.id]}
                  onChangeText={(inputValues) =>
                    onHandleInput(inputValues, item)
                  }
                  defaultValue={item.quantity.toString()}
                  autoCapitalize={"none"}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  backgroundColor: palette.white,
                }}
                onPress={() => increase(item)}
              >
                <AntDesign name="plus" size={25} color={palette.secondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => dispatch(removeItem(item.id))}
              style={{
                // backgroundColor: "#c11717",
                justifyContent: "center",
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 10,
                marginVertical: 10,
                width: widthScreen * 0.26,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Avanta-Medium",
                  //color: "#fff",
                  color: palette.secondary,
                  textAlign: "center",
                }}
              >
                <Ionicons name="trash-bin" size={14} />
                {"  "}
                remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          //  backgroundColor: palette.secondary,

          justifyContent: "center",
          alignItems: "center",
          width: widthScreen * 0.22,
        }}
      >
        <Text
          style={{
            // color: "#fff",
            color: palette.secondary,
            fontFamily: "Avanta-Bold",
            fontSize: 24,
          }}
        >
          $ {item.totalItemPrice}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    backgroundColor: "#fff",
  },
  fabStyle: {
    bottom: heightScrenn * 0.03,
    //right: 16,
    left: 16,
    backgroundColor: palette.primary,
    color: "green",
    position: "absolute",
  },
  input: {
    //  width: 300,
    //  height: 45,
    backgroundColor: palette.white,
    //borderWidth: 2,
    borderRadius: 10,
    height: 40,
    width: 50,
    //  marginVertical: 10,
  },
});
