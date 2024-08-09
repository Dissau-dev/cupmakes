import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { Button, Dialog, Modal, Portal, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import {
  cleanCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectProducts,
  setQuantity,
} from "../../../../store/slices/cartSlice";
import { useForm } from "react-hook-form";
import { ModalComponent } from "../../ModalComponent";
import { ModalCartContent } from "./ModalCartContent";

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
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));

      setInputValues((prevValues) => ({
        ...prevValues,
        //@ts-ignore
        [item.id]: (parseInt(inputValues[item.id]) - 1).toString(),
      }));
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        //@ts-ignore
        [item.id]: (parseInt(inputValues[item.id]) - 1).toString(),
      }));
      dispatch(decreaseQuantity(item.id));
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <View
      style={{
        width: widthScreen * 1,
        justifyContent: "space-between",
        flexDirection: "row",
        //  backgroundColor: "#f4f7f78d",
        borderBottomWidth: 0.5,
        flex: 1,
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
              fontSize: 20,
              maxWidth: widthScreen * 0.4,
            }}
          >
            {item.name}
          </Text>
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
                  borderWidth: 0.7,
                  borderColor: "#c1c1c1",
                  borderRadius: 10,
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
                onPress={() => decrease(item)}
              >
                <AntDesign name="minus" size={25} color={palette.secondary} />
              </TouchableOpacity>
              <View
                style={{
                  width: 50,
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: heightScrenn * 0.01,
                }}
              >
                <TouchableOpacity
                  onPress={showModal}
                  style={{
                    width: 40,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: palette.secondary,
                      fontSize: 18,
                      fontFamily: "Avanta-Medium",
                      borderRightColor: "#eee",
                      borderLeftColor: "#eee",
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                    }}
                  >
                    {item.quantity}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 45,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                }}
                onPress={() => increase(item)}
              >
                <AntDesign name="plus" size={25} color={palette.secondary} />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }} />
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
            fontFamily: "Avanta-Medium",
            fontSize: 18,
          }}
        >
          $ {item.totalItemPrice}
        </Text>
      </View>
      <ModalComponent
        isCart={true}
        item={item}
        titleModal="Select Quantity"
        onClose={hideModal}
        visible={modalVisible}
      />
    </View>
  );
};
