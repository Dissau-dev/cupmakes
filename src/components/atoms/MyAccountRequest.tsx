import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { stylesRegister } from "../../screens/Auth/LoginScreen";
//import Layout from './Layout';
import { StackScreenProps } from "@react-navigation/stack";
//import { mask } from "react-native-mask-text";

import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

type CardProps = {
  color?: string;
  address: string;
  onPress?: () => void;
  minAmountWithoutConfirmation?: number;
  vence?: string;
  issueEntity?: string;
  logo?: any;
};
export interface cards {
  color: string;
  address: string;
  onPress?: () => void;
  minAmountWithoutConfirmation?: number;
  vence: string;
  issueEntity: string;
  logo?: any;
  id: number;
}

export const MyAccountRequest = ({
  color,
  address,
  onPress,
  minAmountWithoutConfirmation,
  vence,
  issueEntity,
  logo,
}: CardProps) => {
  //const maskedCardNumber = mask(address, "9999 9999 9999")

  return (

       <View style={stylesCard.card}>
      <View style={stylesCard.container}>
      
        <Pressable
          style={{
            backgroundColor: color,
            width: width * 0.65,
            height: height * 0.2,
            borderRadius: 15,
            marginBottom: '6%',
          }}
          onPress={onPress}
        >
          <View style={stylesCard.logos}>
            <Text style={stylesCard.textTarjeta}>Ptos</Text>
            <View style={{borderColor:'#c1c1c1',borderWidth:1.5, borderRadius:100, top:'auto'}}>
            <Image source={logo} style={stylesCard.imagenLogo} />
            </View>
          </View>
          <View style={stylesCard.montoContainer}>
            <Text style={stylesCard.textMonto}>
              {minAmountWithoutConfirmation?.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
          <View style={stylesCard.detallesContainer}>
            <View style={stylesCard.fechaContainer}>
              <Text style={stylesCard.detallesText}>{address}</Text>
              <Text style={stylesCard.nombreEmpresa}>{issueEntity}</Text>
            </View>
            <View>
              <Text
                style={{  fontWeight: "bold", fontSize: 14 }}
              >
                {vence}
              </Text>
            </View>
          </View>
        </Pressable>
        
      </View>
      </View>
  );
};

export const stylesCard = StyleSheet.create({
  card: {
    width: width *0.65,
    
    marginBottom:10,
    height: height * 0.24,
    alignItems:'center',
    marginHorizontal: width*0.05,
    marginTop:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: '3%',
  
  },

  btnTargeta1: {
    backgroundColor: "blue",
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  btnTargeta2: {
    backgroundColor: "#BE1522",
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  btnTargeta3: {
    backgroundColor: "#33B5D3",
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },

  imagenLogo: {
    borderRadius: 100,
    width: width * 0.12,
    height: height * 0.06,
  
  },
  logos: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: '4%',
  },
  textTarjeta: {
    fontSize: 16,
    fontWeight: "bold",
  
  },
  montoContainer: {
    alignItems: "flex-start",
    marginLeft: '8%',
    top: '10%',
  },
  textMonto: {
    
    fontWeight: "900",
    fontSize: 30,
  },
  detallesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: '4%',
  },
  fechaContainer: {
    marginTop: '10%',
    marginLeft: '4%',
  },
  detallesText: {

    fontWeight: "bold",
    fontSize: 20,
  },
  nombreEmpresa: {
 
    fontWeight: "bold",
    fontSize: 14,
  },
});
