import React from 'react'
import { Button } from 'react-native-paper'
import { palette } from '../../../theme/colors'
import Layout from '../../../utils/Layout'
import { View,Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const height = Layout.window.height;
const width = Layout.window.width;

interface Props {
onPress:() => void
}

export const ListFooterMycard = ({onPress}:Props) => {
  return (
    <View style={{ alignItems:'center', marginBottom:20 }}>
    <Button
      mode="contained"
      buttonColor={palette.primary}
      rippleColor={palette.datesFilter}
      
      style={{  
        marginTop:'8%',
        height: height * 0.065,
         borderRadius:100,
      alignItems:'center',
      justifyContent:'center'
     }}
     labelStyle={{
      fontSize: 17,
      fontFamily:'Poppins-Medium',
      justifyContent:'center',
      alignItems:'center',
      marginBottom:2,
      width: width * 0.5,
      textAlignVertical:'center',
      height: height * 0.05
     }}
     onPress={onPress}
    >
      
      <Text style={{ color: "white", fontFamily:'Poppins-Medium',
       fontSize:18, }}><Fontisto name="plus-a" size={16}/>  Crear</Text>
    </Button>

  </View> 
  )
}
