import React, { useCallback } from "react";
import { useGetCardsOperationsQuery } from "../../../../store/api/cardApi";
import OperationSkeleton from "../../skeletons/OperationSkeleton";
import { FlatList, RefreshControl, Text } from "react-native";
import { MyOperations } from "../../MyOperations";
import { useNavigation } from "@react-navigation/native";
import { PlaceHolderOpe } from "../../PlaceHolderOpe";
import { stylesOperations } from "../../../../screens/home/DetallesCardScreen";
import OperationQuerySkeleton from "../../skeletons/OperationQuerySkeleton";

interface Props {
  code: string | number;
  entityName: string;
}

export const CardQueryOperation = ({ code, entityName }: Props) => {
  const navigation = useNavigation();
  const {
    data: cardOpe,
    refetch,
    isFetching,
    isLoading,
  } = useGetCardsOperationsQuery(code);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <OperationQuerySkeleton />;
  }
  const renderHeader = () => {
    if (cardOpe?.items.length === 0 || !cardOpe) {
      return null;
    } else {
      return (
        <Text style={stylesOperations.textOperaciones}>
          Últimas operaciones
        </Text>
      );
    }
  };
  return (
    <>
      <FlatList
        data={cardOpe?.items}
        renderItem={({ item }) => (
          <MyOperations
            amountOpe={item.amountTransferred}
            fetchOpe={item.createdAt}
            onPressDetail={() =>
              //@ts-ignore
              navigation.navigate("DetailsOperations", {
                dateOpe: item.createdAt,
                amountOpe: item.amountTransferred,
                accountOpe:
                  item.sourceAccount === null
                    ? item.sourceCard.address
                    : item.sourceAccount.address,
                descriptionOpe: item.description,
                idOpe: item.transactionNumber,
                typeOpe: item.type,
                blocked: "none",
                entity: entityName,
                sourceCard:
                  item.sourceCard === null
                    ? item.sourceAccount.address
                    : item.sourceCard.address,
                targetCard:
                  item.targetCard === null
                    ? item.targetAccount.address
                    : item.targetCard.address,
                typeOfTransacction:
                  item.type === "PAYMENT"
                    ? "PAYMENT"
                    : item.sourceCard.address === code
                    ? "SEND"
                    : "GET",
              })
            }
          />
        )}
        keyExtractor={(item) => item.transactionNumber}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<PlaceHolderOpe />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
