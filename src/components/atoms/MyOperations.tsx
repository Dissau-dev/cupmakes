import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { formatDate, formatNumber } from "../../utils/utils";
import moment from "moment";

import SvgBtn from "../../../assets/right-arrow.svg";
import { Fontisto } from "@expo/vector-icons";
import { palette } from "../../theme/colors";

type MyOpeProps = {
  //mejorar esto por el tipo de operacion
  fetchOpe: string;
  transaction?: string;
  operation?: string;
  sourceOpe?: any;
  numberOpe?: string | number;
  amountOpe: number;
  onPressDetail: () => void;
};

export const MyOperations = ({
  fetchOpe,
  amountOpe,
  transaction,
  operation,
  onPressDetail,
}: MyOpeProps) => {
  return (
    <View style={styles.historial}>
      <Pressable onPress={onPressDetail}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            // marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <View style={styles.earnHistorial}>
            {transaction === "PAYMENT" ? (
              <Fontisto name="dollar" color={"#fff"} size={28} />
            ) : (
              <SvgBtn
                style={
                  operation === "SEND" ? styles.arrowLeft : styles.arrowRight
                }
                fill={"#fff"}
              />
            )}
          </View>
          <View style={{ marginRight: "auto", marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14 }}>
              {transaction === "PAYMENT"
                ? "Pago exitoso"
                : "Transferencia exitosa"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#969696",
                  marginLeft: 10,
                }}
              >
                {moment(fetchOpe).format("DD/MM/YY")}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textMonto}>
              {transaction === "PAYMENT" ? "-" : operation === "GET" ? "" : "-"}{" "}
              {formatNumber(amountOpe)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  arrowLeft: {
    width: "75%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-40deg" }],
  },
  arrowRight: {
    width: "75%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "130deg" }],
  },
  OpeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Operaciones: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  montoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoPuntos: {
    borderRadius: 100,
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 2,
    marginLeft: 5,
  },
  textMonto: {
    fontSize: 22,
    color: "#323131",
    marginTop: 6,
    fontFamily: "Poppins-Medium",
  },
  ultimasOPeraciones: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 5,
  },
  textOperaciones: {
    fontWeight: "800",
    fontSize: 14,
    marginLeft: 5,
    marginTop: 3,
  },
  iconsOpe: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  historial: {
    width: "96%",
    height: 66,
    borderColor: "#969696",
    justifyContent: "center",
    marginHorizontal: 4,
  },

  earnHistorial: {
    borderRadius: 100,
    width: 35,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#219653",
  },
});
