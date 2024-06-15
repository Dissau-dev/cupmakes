import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import { globals } from "../../../theme/styles/global";
import Layout from "../../../utils/Layout";
import { BanerSkeleton } from "../BanerSkeleton";

export default function OperationSkeleton() {
  return (

    <View style={[globals.container, { padding: 10 }]}>
      
      <View style={styles.itemContainer}>
      <View style={{marginBottom: Layout.window.height * 0.24}}>
         
         <BanerSkeleton  onProfile={() => {
           // navigation.dispatch(
           //   CommonActions.navigate({
           //     name: "ProfileNavigator",
           //   })
           // );
           //@ts-ignore
           navigation.navigate("ProfileNavigator", {
             screen: "PerfilScreen",
           });
         }}
         //@ts-ignore
         onNotifications={() => console.log('m')}/>
         
         </View>
        
            <View style={{marginTop:50, alignItems:'center', }}>
            <Skeleton
              height={18}
              width={'80%'}
             
              colorMode="light"
              colors={skeletonsColors}
            />
        <View style={{height:10}}/>
            <Skeleton
              height={24}
              width={'50%'}
             
              colorMode="light"
              colors={skeletonsColors}
            />
            </View>
            <View style={[styles.row, { justifyContent: "space-between",marginTop:40 }]}>
            {Array.from({ length: 4}).map((_, index) => {
          return (
            <View key={index}>
            <View style={[styles.column, { justifyContent: "space-between" }]} >
              <View style={{flexDirection:'column'}}>
            <Skeleton
              height={40}
              width={40}
              radius={"round"}
              colorMode="light"
              colors={skeletonsColors}
            />
             <View style={{marginTop:20, marginHorizontal:-2}}> 
             <Skeleton
              height={12}
              width={50}
        
              colorMode="light"
              colors={skeletonsColors}
            />
            </View>
            </View>
          </View>
         
          </View>
          
          );
        })}
          
            </View>
        
        <View style={{marginTop:25, marginHorizontal:10}}>
        <Skeleton
              height={15}
              width={130}
        
              colorMode="light"
              colors={skeletonsColors}
            />
        </View>
      
      
     <View style={{marginBottom:20}}></View>
      {Array.from({ length: 3}).map((_, index) => {
          return (
            <View key={index}>
            <View style={[styles.column, { justifyContent: "space-between" }]} >
            <View style={{ flexDirection:'row',}}>
            <Skeleton
              height={40}
              width={40}
              radius={"round"}
              colorMode="light"
              colors={skeletonsColors}
            />
            <View style={{flexDirection:'column' ,marginVertical:4,marginLeft:6,justifyContent:'space-between'}}>
             <Skeleton
              height={12}
              width={100}
              radius={"round"}
              colorMode="light"
              colors={skeletonsColors}
            />
            <View style={{marginLeft:10}}>
             <Skeleton
              height={12}
              width={70}
              radius={"round"}
              colorMode="light"
              colors={skeletonsColors}
            />
            </View>
            </View>
            </View>
             <View style={{marginTop:20}}> 
             <Skeleton
              height={16}
              width={60}
        
              colorMode="light"
              colors={skeletonsColors}
            />
            </View>
          </View>
          <Divider />
          </View>
          
          );
        })}
       
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "95%",
    minHeight: 200,
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: 8,
    padding: 5,
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  column:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  }
});
