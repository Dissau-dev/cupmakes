import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View ,Text, RefreshControl} from 'react-native'
import { useGetAccountQuery } from '../../../store/api/cardApi';
import { MyCard } from '../MyCard';
import { mask } from 'react-native-mask-text';
import { PlaceHolderCard } from '../PlaceHolderCard';
import Layout from '../../../utils/Layout';


interface Props {
    onPress:any
}

const width = Layout.window.width

export const FlatListAccount = ({onPress}:Props) => {
    const { data: account,refetch,isFetching,isLoading,isError} = useGetAccountQuery();
    const [load, setload] = useState<boolean>(false)
    const onRefresh = useCallback(() => {
        refetch();
      }, [refetch]);
    
      useEffect(() => {
        if(!load){
          onRefresh();
          setload(true)
        }
      
      }, []) 
   
  return (
    <FlatList
          data={account?.items}
          renderItem={({ item }) => (
            <MyCard 
            address={mask(item.address,"9999 9999 ****")}
          // logo={"../../../../assets/logo.png" }
          logo={ item.issueEntity.profileImage === null  ? '../../../assets/images/genericImage.jpg': item.issueEntity.profileImage.url}
          //  logo={`https://apidevpay.tecopos.com${item.issueEntity.profileImage.url}`}
             hash={item.issueEntity.profileImage.hash}
            
             amount={item.amount}
             key={item.id}
             onPress={onPress}
            />
          )}
          //@ts-ignore
          keyExtractor={(item) => item.id}
       
          ListEmptyComponent={
            <>
            <View style={{ alignItems:'center', marginTop:16, marginHorizontal:width * 0.2}}>
             <Text style={{fontSize:16, fontFamily:'Poppins-Medium',textAlign:'center'}}>No hay cuentas creadas</Text> 
            <PlaceHolderCard
              
              Home={true}
          /> 
            </View>
            </>
          }
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
        
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
        />
  )
}
