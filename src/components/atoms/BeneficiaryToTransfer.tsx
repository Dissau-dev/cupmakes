import React, { useState } from 'react'
import { Pressable, View , Image, StyleSheet, Text, ScrollView, Modal, TouchableOpacity} from 'react-native'
import { formatDate, formatNumber } from '../../utils/utils'
import moment from 'moment'
import { stylesRegister } from '../../screens/Auth/LoginScreen'
import { JsxAST } from 'react-native-svg/lib/typescript/xml'

import SvgBtn from '../../../assets/right-arrow.svg'
import { mask } from 'react-native-mask-text'
import Layout from '../../utils/Layout'
import { Button } from 'react-native-paper'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { palette } from '../../theme/colors'

const width = Layout.window.width
const height = Layout.window.height

type MyProps = {
  
  fullName: string | any,
  account: string
  amountOpe:number,
  onPressDetail?:  ()=> void,
  onDelete?:  ()=> void,
  onEdit?:  ()=> void
  onViewModal?:  ()=> void
}

export const BeneficiaryToTransfer = ({fullName,account ,amountOpe,onDelete,onEdit,
 onPressDetail}:MyProps) => {

  const [modalVisible, setModalVisible] = useState(false);

  const onEditing = () => {
    //@ts-ignore
    onEdit()
    setModalVisible(false)
  }

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
                <View style={{width: width * 0.05}}/>
                <View style={ {
    borderRadius: 100,
    
    width: 35,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFCB14",}}>
                
                <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: "#fff",
                textAlign: "center",
                justifyContent: "center",
              
              }}
            >
              {fullName.charAt(0).toUpperCase()}
            </Text>
                  
                </View>
                <View style={{ marginRight: "auto", marginLeft: 10 }}>
                  <Text style={{   fontFamily: 'Poppins-Medium', fontSize: 14 , textAlign:'left'}}>
                    {`${fullName.substring(0, 21)} ${fullName.lenght > 20 ? '...':''}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/*<Text
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        color: "#969696",
                       
                      }}
                    >
                     #{numberOpe}
                    </Text>*/}
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        color: "#969696",
                        
                        
                      }}
                    >
                      {mask(account ,"9999 9999 ****")}
                    </Text>
                  </View>
                </View>
                <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Button
                   rippleColor={palette.icons}
                    >
                      <Text style={{fontFamily:'Poppins-Bold',color:'#000'}}><Ionicons name='chevron-forward' size={20}/></Text></Button>
              </View> 
                </View>
              </View>  
           </Pressable>  
           
         </View>
        
              
  )
}
const styles = StyleSheet.create({
    
  btnLogIn: {
    marginTop: 25,
    marginBottom:20,
    borderBottomWidth:1,
    width: width * 0.86,
    height: 45,
     borderRadius:100,
     flexDirection:'row',
     justifyContent:'space-between'
  },
  textLogIn: {
  
     fontSize: 16,
    
     fontFamily:'Poppins-Medium',
     width : width * 0.42,
     textAlignVertical:'center',
     marginVertical:height * 0.021
   },
    bienvenido: {
fontFamily:'Poppins-Medium',
fontSize:16
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
 
 
    historial: {
      width: "94%",

      height: 66,
      borderBottomWidth:1,
     
      
      borderColor: "#969696",
      justifyContent: "center",
      marginHorizontal: Layout.window.width * 0.02,
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
      width: 35,
      height: 35,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CC0000",
    },
    blueView: {
      width: '100%',
      height: 50,
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      backgroundColor: palette.primary,
      
    },
    newInput :{
      width: width * 0.7,
      height: 35,
      backgroundColor: palette.white,
      borderColor: palette.white,
      // borderRadius: 100,
      // paddingLeft: 20,
      paddingVertical: 5,
      marginVertical: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      width: width *0.9,
      borderRadius:10,
      
      alignItems: 'center',
      elevation: 5,
    },
    modalText: {
      marginBottom: 20,
    },
  });
  