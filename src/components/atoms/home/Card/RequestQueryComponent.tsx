import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, Dimensions, RefreshControl } from "react-native";
import CardRequested from "../../CardRequested";
import { useNavigation } from "@react-navigation/native";
import { useGetAllRequestQuery } from "../../../../store/api/cardApi";
import moment from "moment";
import { PlaceHolderCard } from "../../PlaceHolderCard";
import { ListFooterRequest } from "../ListFooterRequest";
import DispatchDetailsSkeleton from "../../skeletons/MySkeleton";
import HomeCardSkeleton from "../../skeletons/HomeCardSkeleton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const RequestQueryComponent = () => {
  const navigation = useNavigation();
  const [load, setload] = useState<boolean>(false);

  const {
    data: card,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllRequestQuery();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!load) {
      onRefresh();
      setload(true);
    }
  }, []);

  if (isLoading) {
    return <HomeCardSkeleton />;
  }

  return (
    <View
      style={{
        height: height * 0.62,
        paddingBottom: height * 0.2,
        alignItems: "center",
      }}
    >
      <FlatList
        data={card?.items}
        renderItem={({ item }) => (
          <CardRequested
            status={item.status}
            createdAt={moment(item.createdAt).format("DD-MM-YY")}
            //   cardImage={'../../../assets/images/genericImage.jpg'}
            cardImage={
              item.category === null
                ? "../../../assets/images/genericImage.jpg"
                : item.category.cardImage === null
                ? "../../../assets/images/genericImage.jpg"
                : item.category.cardImage.url
            }
            holderName={item.holderName}
            key={item.id}
            onPress={true}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <>
            <PlaceHolderCard title="tarjetas aceptadas" Home={false} />
          </>
        }
        ListFooterComponent={
          <ListFooterRequest
            title="Solicitar"
            //@ts-ignore
            onPress={() => navigation.navigate("RequestCardScreen")}
          />
        }
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled
      />
    </View>
  );
};
