import React, { useCallback, useEffect, useState } from "react";
import { MyCard } from "../../MyCard";
import { FlatList, View, Text, Dimensions, RefreshControl } from "react-native";
import { PlaceHolderCard } from "../../PlaceHolderCard";
import { useGetAccountQuery } from "../../../../store/api/cardApi";
import { mask } from "react-native-mask-text";
import { ListFooterRequest } from "../ListFooterRequest";
import { useNavigation } from "@react-navigation/native";
import DispatchDetailsSkeleton from "../../skeletons/MySkeleton";
import HomeCardSkeleton from "../../skeletons/HomeCardSkeleton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  isHome: boolean;
}

export const AccountQueryComponet = ({ isHome }: Props) => {
  const {
    data: account,
    refetch,
    isFetching,
    isLoading,
  } = useGetAccountQuery();
  const navigation = useNavigation();
  const [load, setload] = useState<boolean>(false);

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
      style={
        isHome
          ? null
          : {
              alignItems: "center",
              height: height * 0.62,
              paddingBottom: height * 0.11,
            }
      }
    >
      <FlatList
        data={account?.items}
        renderItem={({ item }) => (
          <MyCard
            address={mask(item.address, "9999 9999 ****")}
            logo={
              item.issueEntity.profileImage === null
                ? "../../../assets/images/genericImage.jpg"
                : item.issueEntity.profileImage.url
            }
            amount={item.amount}
            key={item.id}
            onPress={() =>
              //@ts-ignore
              navigation.navigate("CardDetailsScreen", {
                accountBalance: item.amount,
                entityName: item.issueEntity.name || "Detalles",
                id: Number(item.id),
                code: item.address,

                expiratedAt: item.createdAt,
                holderName: item.name || "Propetario",
                barCode: item.code,
                isAnAccount: true,
              })
            }
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <>
            <PlaceHolderCard title="cuentas creadas" Home={isHome} />
          </>
        }
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isHome ? null : (
            <ListFooterRequest
              title="Crear"
              //@ts-ignore
              onPress={() => navigation.navigate("RequestAccountScreen")}
            />
          )
        }
        horizontal={isHome ? true : false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
