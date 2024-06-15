import { Fontisto, Ionicons } from '@expo/vector-icons'

import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    Dimensions,
    Pressable,
    Modal,
    ScrollView,
    Platform
  } from "react-native";

import { palette } from '../../theme/colors'
import TextInputController from './formControls/TextInputController'
import { stylesSetProfile } from '../../theme/styles/PerfilscreenStyles'
import Layout from '../../utils/Layout'
import { useForm } from 'react-hook-form'
import { validateEmail } from '../../utils/validation';

const width = Layout.window.width;
const height = Layout.window.height;

interface Props {
    firstName?:string;
    lastName?:string;
    email?:string;
    phone?:string;
    onEdit: any;
    isLoading?: boolean
  }

export const SetProfileForms = ({onEdit, firstName,lastName,email,phone,isLoading}:Props) => {

    const {
        handleSubmit,
        control,
        setFocus,
        formState: { isSubmitting, isValid, isDirty },
      } = useForm({
        defaultValues: {
            firstName: `${firstName}`,
            lastName: `${lastName ||""}`,
            email:`${email}`,
            phone: `${phone ||  ""}`
        },
      });
      
  return (
    <View>
            <View style={{ marginTop:30, marginLeft:width * 0.08, alignItems:'center'}}>
              
           

              <View style={{flexDirection:'row'}}>
 
                <View >
                <Text style={stylesSetProfile.ProfileText}>Nombre </Text>
 
                 
           <View style={{flexDirection:'row'}}>
              <TextInputController
              placeholder=""
               controller={{
                 name: "firstName",
                
                 control: control as any,
               }}
               style={stylesSetProfile.newInput}
             
               dense
               
               textColor= '#000'
               autoCapitalize={"none"}
               returnKeyType="next"
         
               left={
                 <TextInput.Icon
                   icon={() => (
                     <Fontisto name="person" size={18} color="#c1c1c1" />
                   )}
                   color={(isTextInputFocused) => "#c1c1c1"}
                 />
               }
             />
             
             </View>
                {/* <Text style={styles.settingText}>{ user?.firstName + " " + user?.lastName  || user?.username}</Text> */}
                </View>
                
              </View>
              <View style={{flexDirection:'row'}}>
                
                <View >
                <Text style={stylesSetProfile.ProfileText}>Apellidos </Text>
 
                 
           <View style={{flexDirection:'row'}}>
              <TextInputController
              placeholder=""
               controller={{
                 name: "lastName",
                
                 control: control as any,
               }}
               style={stylesSetProfile.newInput}
             
               dense
               
               textColor= '#000'
               autoCapitalize={"none"}
               returnKeyType="next"
             
               left={
                 <TextInput.Icon
                   icon={() => (
                     <Fontisto name="person" size={18} color="#c1c1c1" />
                   )}
                   color={(isTextInputFocused) => "#c1c1c1"}
                 />
               }
             />
             
             </View>
                {/* <Text style={styles.settingText}>{ user?.firstName + " " + user?.lastName  || user?.username}</Text> */}
                </View>
                
              </View>
              <View style={{flexDirection:'row'}}>
                
                <View >
                <Text style={stylesSetProfile.ProfileText}>Correo electrónico</Text>
                <View style={{flexDirection:'row'}}>
              <TextInputController
              placeholder=""
               controller={{
                 name: "email",
                 rules: {
                   
                   validate: { validateEmail },
                 },
                 control: control as any,
               }}
               style={stylesSetProfile.newInput}
             
               dense
               
               textColor= '#000'
               autoCapitalize={"none"}
               returnKeyType="next"
               
               left={
                 <TextInput.Icon
                   icon={() => (
                   
                     <Fontisto name="email" size={20} color="#c1c1c1" />
                   )}
                   color={(isTextInputFocused) => "#c1c1c1"}
                 />
               }
             />
             
             </View>
                
                </View>
                
              </View>
              <View style={{flexDirection:'row'}}>
               
                <View style={{}}>
                <Text style={stylesSetProfile.ProfileText}>Teléfono</Text>
                <View style={{flexDirection:'row'}}>
              <TextInputController
              placeholder=""
               controller={{
                 name: "phone",
                
                 control: control as any,
               }}
               style={stylesSetProfile.newInput}
             
               dense
               
               textColor= '#000'
               autoCapitalize={"none"}
               returnKeyType="next"
               keyboardType="phone-pad"
               left={
                 <TextInput.Icon
                   icon={() => (
                     <Fontisto name="mobile-alt" size={20} color={palette.icons} />
                   )}
                   color={(isTextInputFocused) => "#c1c1c1"}
                 />
               }
             />
             
             </View>
                 
                </View>
                
              </View>
           
             
           </View>
           <View style={{justifyContent:'center', alignItems:'center'}}>
          <Button
             
              
              style={[stylesSetProfile.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              //@ts-ignore
              onPress={handleSubmit(onEdit)}
              textColor={palette.white}
              loading={isSubmitting}
              disabled={!isDirty || isSubmitting || isLoading }
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
            ><Ionicons name="pencil-outline"
             color={!isDirty || isSubmitting || isLoading ? palette.darkGray : '#fff'} size={18}/>
              {isSubmitting ? " Editando" : " Editar"}
            </Button>
            </View>
    </View>
  )
}
