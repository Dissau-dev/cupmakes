import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { CarParamList } from "../../routes/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLineItems, selectProducts } from "../../store/slices/cartSlice";
import { removeProduct } from "../../store/slices/cartSlice";
import { api_configs } from "../../config/system_config";
import axios from "axios";
import { useGetUserByEmailQuery } from "../../store/api/authApi";

import { LoginComponent } from "../../components/auth/LoginComponent";
import { selectUser, selectAuth } from "../../store/slices/userSlice";

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "CarScreen"> {}

const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";

const base64 = require("base-64");

export const CarScreen = () => {
  const isAuth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  console.log(user?.email);

  const products = useAppSelector(selectProducts);
  const lineItems = useAppSelector(selectLineItems);
  const dispatch = useAppDispatch;

  const line_Items: { product_id: number; quantity: number }[] = [];

  const formatLineItems = () => {
    products.forEach((i) => {
      line_Items.push({ product_id: i.id, quantity: 1 });
    });

    return line_Items;
  };

  useEffect(() => {
    formatLineItems();
    //console.log(line_Items);
  }, []);

  const createOrder = async (data: any) => {
    const endpoint = `${api_configs.BASE_URL}/orders`;

    const body = {
      //  customer_id: 1, // Reemplaza esto con el ID del cliente
      billing: {
        // first_name: data.customer_name,
        first_name: "Test ",
        last_name: "mauricio",
        address_1: "address client test",
        city: "Tampa",
        state: "Florida",
        postcode: "20212",
        country: "USA",
        email: "mauriciogaraco@gmail.com",
        phone: "+1 809 589 005",
      },
      shipping: {
        first_name: "test", //data.customer_name,
        last_name: "mauricio",
        address_1: "addres", // data.customer_address,
        city: "tampa",
        state: "Florida",
        postcode: "20212",
        country: "USA",
      },
      payment_method: "bacs", // Reemplaza esto con el método de pago deseado
      payment_method_title: "Transferencia bancaria directa",
      line_items: line_Items,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + base64.encode(consumerKey + ":" + consumerSecret),
      },
    };

    const response = await axios.post(endpoint, body, config);

    return response.data;
  };

  if (!isAuth) {
    return <LoginComponent />;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 2,
              marginTop: 10,
              paddingHorizontal: 10,
              height: 50,
              alignItems: "center",
              width: 200,
              alignSelf: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>$ {item.price}</Text>
            </View>

            <Pressable
              style={{ backgroundColor: "red" }}

              // onPress={handelDelete}
            >
              <Text style={{ margin: 6, color: "#fff" }}>Delete {}</Text>
            </Pressable>

            {/* <Pressable
              style={{ backgroundColor: palette.secondary }}
              onPress={() => handleAddToCart(item)}
            >
              <Text
                style={{
                  color: "#fff",
                  width: 50,
                  textAlign: "center",
                  paddingVertical: 4,
                }}
              >
                Add
              </Text>
              </Pressable> */}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <Pressable
        style={{ backgroundColor: "green", alignSelf: "center", marginTop: 60 }}
        onPress={createOrder}
      >
        <Text style={{ margin: 10 }}>Pagar {}</Text>
      </Pressable>
    </View>
  );
};
