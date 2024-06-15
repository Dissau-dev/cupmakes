import React, { useState } from "react";
import { Pressable, View, Text, Dimensions, StyleSheet } from "react-native";
import RadioBoxController from "./formControls/RadioBoxController";
import { useForm } from "react-hook-form";
import { Checkbox } from "react-native-paper";
import CheckBoxController from "./formControls/CheckBoxController";

export interface Notif {
  id: number;
  text: string;
}
export const notifications = [
  { id: 1, text: "Notificación 1" },
  { id: 2, text: "Notificación 2" },
];
interface Props {
  tooglePress?: any;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const Notifications = ({ tooglePress }: Props) => {
  const [check, setcheck] = useState(false);
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      checkbox: check,
    },
  });

  const handleCheckBoxPress = (id: number) => {
    if (check) {
      console.log("ID de la notificación seleccionada:", id);
    } else {
    }
  };

  return (
    <View style={stylesNotif.card}>
      <View style={stylesNotif.container}>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={tooglePress}>
            <CheckBoxController
              controller={{
                name: "checkbox",

                control: control as any,
              }}
              data={{ label: "", key: "check", notification: true }}
            />
          </Pressable>
          <Text style={stylesNotif.detallesText}>
            Transferencia realizada con éxito
          </Text>
        </View>

        <View style={stylesNotif.detallesContainer}>
          <Text style={stylesNotif.nombreEmpresa}>
            Saldo disponible, se ha realizado un pago de 100 puntos a fulano
          </Text>
        </View>
      </View>
    </View>
  );
};

export const stylesNotif = StyleSheet.create({
  card: {
    width: width * 0.84,
    height: height * 0.16,
    marginBottom: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: width * 0.03,

    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  imagenLogo: {
    borderRadius: 100,
    width: width * 0.096,
    height: height * 0.048,
  },
  logos: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "6%",
    top: "-6%",
  },
  textTarjeta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  montoContainer: {
    alignItems: "flex-start",
    marginLeft: "8%",
    top: "5%",
  },
  textMonto: {
    fontWeight: "900",
    fontSize: 30,
  },
  detallesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",

    top: "4%",
    marginHorizontal: "4%",
  },
  fechaContainer: {
    marginLeft: "4%",
  },
  detallesText: {
    color: "#414141",
    fontSize: 15,
    marginTop: "2%",
    fontFamily: "Poppins-Medium",
    marginLeft: "1%",
    textAlign: "left",
  },
  nombreEmpresa: {
    color: "#414141",
    fontSize: 14,
    fontFamily: "Poppins-Light",
  },
});
