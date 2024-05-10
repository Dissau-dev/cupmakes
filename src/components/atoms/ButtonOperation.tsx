import React from 'react'
import { Pressable, View,StyleSheet , Text, Image} from 'react-native'

import SvgBtn from '../../../assets/right-arrow.svg'
import SvgNut from '../../../assets/setting.svg'
import SvgAdd from '../../../assets/add.svg'
import { Fontisto, Ionicons } from '@expo/vector-icons'

type OpeProps = {
    ImageOpe: any,
    onOperation: () => void
    colorButtonOpe: any
    textOpe: string
    iconOpe:any
  }


export const ButtonOperation = ({ImageOpe, onOperation, colorButtonOpe, textOpe, iconOpe}:OpeProps) => {
  return (
        
            <View style={styles.Operaciones}>
              <Pressable style={colorButtonOpe} onPress={onOperation}>
                {/* <Image
                  source={ImageOpe}
                  style={iconOpe}
                />*/}
                {
                    (ImageOpe === 'arrow'?<SvgBtn style={iconOpe} fill={'#ffffff'}/> : 
                    ( ImageOpe === 'add') ? <Fontisto name='dollar' color={'#fff'} size={38}/>:
                    <Ionicons name='settings-outline' color={'#fff'} size={38}/> )
                  }
              </Pressable>
              <Text style={styles.textOperaciones}>{textOpe}</Text>
        
          </View>

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
    
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      marginLeft: 5,
      marginTop: 3,
    },

    btnOpe: {
      borderRadius: 100,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      
      //backgroundColor: "#0077B2",
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
    earnHistorial: {
      borderRadius: 100,
      width: 35,
      height: 35,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00CC66",
    },
    paymentHistorial: {
      borderRadius: 100,
      width: 35,
      height: 35,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CC0000",
    },
  });