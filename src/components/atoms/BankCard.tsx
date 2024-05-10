import { Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Image, StyleSheet,Text , Pressable, Dimensions,Modal} from 'react-native';
import { Button, } from 'react-native-paper';
import { palette } from '../../theme/colors';

interface Props {
  holderName?:string,
  cardImage?: any;
  onPress?: () => void
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const BankCard: React.FC<Props> = ({ holderName, cardImage, onPress }) => {

    const [modalVisible, setModalVisible] = useState(false);
    
  return (
    <View style={styles.cardContainer}>
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image source={cardImage} style={styles.cardImage} />
        
        <View style={styles.cardDetails}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

              

              <View style={{marginLeft:'50%', marginBottom:'10%'}}>
              <Text style={styles.expirationDate}>card Holder</Text>
                 <Text style={{color:'#fff', fontFamily:'Poppins-Medium', fontSize:13}}>{holderName}</Text>
             
     
              </View>

          </View> 
        </View>
      </View>
    </Pressable>
   

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  blueView: {
    width: '100%',
    height: 50,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: palette.primary,
    
  },
  cardContainer: {
    marginHorizontal: width*0.03,
    width: width *0.84,
    height: height * 0.24,
    alignItems: 'center',
    marginVertical: 20,
    flex:1,
    
  },
  card: {
    width: '100%',
    height: '100%',
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
  cardImage: {
    width: width*0.84,
    height: height * 0.24,
    resizeMode: 'cover',
    position: 'absolute',
  },
  cardDetails: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  cardAmount: {
    fontSize: 30,
    fontFamily:'Poppins-Bold',
    marginBottom: 10,
    color:'white',
  },
  expirationDate: {
    fontSize: 14,
    color:'white',
    marginLeft:'30%',
    fontFamily:'Poppins-Medium'
  },
});

export default BankCard;
