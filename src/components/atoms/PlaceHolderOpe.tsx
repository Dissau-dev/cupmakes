import React from 'react'
import { View ,Text,Image, Dimensions} from 'react-native'
import NoOpeation from '../../../assets/no-operation.svg'

import Lottie from "lottie-react-native";
import opeAnimation from "../../../assets/lotties/Animation - placeHolderOpeBlue.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const PlaceHolderOpe = () => {
  return (
          
    <View >

   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lottie
        source={opeAnimation}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
    <Text style={{justifyContent:'center',textAlign:'center', 
     fontSize:18,fontFamily:'Poppins-Medium',marginBottom:100}}
     >No hay operaciones para mostrar</Text>
    </View> 
  )
}
