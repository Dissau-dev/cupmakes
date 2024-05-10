import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import { globals } from "../../../theme/styles/global";
import { Baner } from "../Baner";
import { BanerSkeleton } from "../BanerSkeleton";
import Layout from "../../../utils/Layout";


export default function HomesSkeleton() {
  return (
    <View style={[globals.container, { padding: 10 }]}>
      <View style={styles.itemContainer}>
        <View style={[styles.row, { justifyContent: "flex-start", marginVertical:15 }]}>
          <View style={{marginBottom: Layout.window.height * 0.2}}>
         
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
     
          <View style={{ width: 10 }} />
        {/*  <Skeleton
            height={50}
            width={50}
            radius={"round"}
            colorMode="light"
            colors={skeletonsColors}
          /> */}
        </View>

       
        <View style={{height:60}}></View>
        <View style={{  paddingHorizontal: 10,marginBottom:16 ,flexDirection:'row', justifyContent:'space-between'}}>
        
          <Skeleton
            height={20}
            width={120}
            colorMode="light"
            colors={skeletonsColors}
          />
            <Skeleton
            height={20}
            width={120}
            colorMode="light"
            colors={skeletonsColors}
          />
        </View>
        <View style={{  flexDirection:'row',alignItems:'flex-start', marginHorizontal:10}}>
        
          <Skeleton
            height={42}
            width={90}
            radius={'square'}
            colorMode="light"
            colors={skeletonsColors}
          />
          <View style={{width:10}}/>
            <Skeleton
            height={42}
            width={90}
            radius={'square'}
            colorMode="light"
            colors={skeletonsColors}
          />
        </View>

         <View style={{marginTop:10}}></View>
        {Array.from({ length: 1}).map((_, index) => {
          return (
            <View style={{flexDirection:'column',marginVertical:10, justifyContent:'center', alignItems:'center'}} key={index}>
           
              <Skeleton
                height={150}
                width={'95%'}
                colorMode="light"
                colors={skeletonsColors}
              />
            </View>
          );

        })}
         <View style={{marginTop:20, marginBottom:10}}>
      <View style={{marginHorizontal:10}}>
      <Skeleton
            height={20}
            width={160}
            radius={'square'}
            colorMode="light"
            colors={skeletonsColors}
          />
          </View>
        <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around'}}>
        <Skeleton
            height={80}
            width={110}
            radius={'square'}
            colorMode="light"
            colors={skeletonsColors}
          />
          <Skeleton
            height={80}
            width={110}
            radius={'square'}
            colorMode="light"
            colors={skeletonsColors}
          />
        </View>  
      </View> 
      </View>

     

      <View
        style={{
          // width: "100%",
          flex: 1,
          flexShrink: 1,
          // backgroundColor: "aliceblue",
          // marginVertical: 10,
          marginBottom: 5,
          // paddingHorizontal: 10,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
       
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
});
