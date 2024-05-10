import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, View, Text, RefreshControl } from "react-native";
import CardRequested from "../../CardRequested";
import moment from "moment";
import { PlaceHolderCard } from "../../PlaceHolderCard";
import { ListFooterRequest } from "../ListFooterRequest";
import { useGetCardQuery } from "../../../../store/api/cardApi";
import { useNavigation } from "@react-navigation/native";
import DispatchDetailsSkeleton from "../../skeletons/MySkeleton";
import HomeCardSkeleton from "../../skeletons/HomeCardSkeleton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  isHome: boolean;
}

export const CardQueryComponent = ({ isHome }: Props) => {
  const navigation = useNavigation();
  const {
    data: cardAccepted,
    refetch,
    isFetching,
    isLoading,
  } = useGetCardQuery();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!load) {
      onRefresh();
      setload(true);
    }
  }, []);

  const [load, setload] = useState<boolean>(false);

  if (isLoading) {
    return <HomeCardSkeleton />;
  }
  return (
    <View
      style={
        isHome
          ? null
          : {
              height: height * 0.62,
              paddingBottom: height * 0.2,
              alignItems: "center",
            }
      }
    >
      {/* camiar el render  item */}
      <FlatList
        data={cardAccepted?.items}
        renderItem={({ item }) => (
          <CardRequested
            status={"PRINTED"}
            createdAt={moment(item.expiratedAt).format("DD-MM-YY")}
            cardImage={
              item.category === null
                ? "../../../assets/images/genericImage.jpg"
                : item.category.cardImage === null
                ? "../../../assets/images/genericImage.jpg"
                : item.category.cardImage.url
            }
            holderName={item.holderName}
            onPress={() =>
              //@ts-ignore
              navigation.navigate("CardDetailsScreen", {
                accountBalance: item.account.amount,
                entityName: item.issueEntity || "Detalles",
                id: Number(item.id),
                code: item.address,

                expiratedAt: item.expiratedAt,
                holderName: item.holderName,
                barCode: item.barCode,
                isAnAccount: false,
              })
            }
            key={item.id}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <>
            <PlaceHolderCard title="tarjetas solicitadas" Home={isHome} />
          </>
        }
        ListFooterComponent={
          isHome ? null : (
            <ListFooterRequest
              title="Solicitar"
              //@ts-ignore
              onPress={() => navigation.navigate("RequestCardScreen")}
            />
          )
        }
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        horizontal={isHome ? true : false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled
      />
    </View>
  );
};
