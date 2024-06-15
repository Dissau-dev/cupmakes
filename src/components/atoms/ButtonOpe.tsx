 /* import React from 'react'
import { Pressable, View , Image, StyleSheet} from 'react-native'

type ButtonOpeProps = {
  onPressOpe: () => void
  source:any  
}

export const ButtonOpe = ({onPressOpe,source}:ButtonOpeProps) => {
  return (
    <>
        <View style={styles.Operaciones}>
              <Pressable style={styles.btnOpe} onPress={onPressOpe}>
                <Image
                  source={source}
                  style={styles.iconsOpe}
                />
              </Pressable>
              <Text style={styles.textOperaciones}>Pagar</Text>
            </View>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
    arrowLeft: {
      width: 35,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      transform: [{ rotate: "-40deg" }],
    },
    arrowRight: {
      width: 35,
      height: 35,
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
      color: "#2d2d2d",
      fontWeight: "700",
      fontSize: 25,
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
    btnOpe: {
      borderRadius: 100,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0077B2",
    },
    btnTransf: {
      borderRadius: 100,
      width: 50,
      height: 50,
      marginLeft: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0096C7",
    },
    btnRecibir: {
      borderRadius: 100,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00B4D8",
    },
    btnNut: {
      borderRadius: 100,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#023E88",
    },
    historial: {
      width: "96%",
      height: 66,
  
      borderBottomWidth: 2,
      borderColor: "#969696",
      justifyContent: "center",
      marginHorizontal: 4,
    },
    historialContainer: {
      // marginTop: 10,
    },
    recibirHistorial: {
      borderRadius: 100,
      width: 35,
      height: 35,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00CC66",
    },
    pagadoHistorial: {
      borderRadius: 100,
      width: 42,
      height: 42,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CC0000",
    },
  });
  */