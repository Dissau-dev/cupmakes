import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";

import { PlaceHolderOpe } from "../../PlaceHolderOpe";
import { MyOperations } from "../../MyOperations";
import { useGetOperationsQuery } from "../../../../store/api/cardApi";
import { stylesOperations } from "../../../../screens/home/DetallesCardScreen";
import OperationSkeleton from "../../skeletons/OperationSkeleton";
import { useNavigation } from "@react-navigation/native";
import { Operations } from "../../../../store/intefaces";
import OperationQuerySkeleton from "../../skeletons/OperationQuerySkeleton";
import { Button } from "react-native-paper";
import { palette } from "../../../../theme/colors";
import { FooterList } from "../../FooterList";

interface Props {
  code: string | number;
  entityName: string;
}

export const AccountQueryOperation = ({ code, entityName }: Props) => {
  const [page, setPage] = useState<string | any>(1);
  const navigation = useNavigation();
  const {
    data: accountOpe,
    isLoading,
    refetch,
    isFetching,
  } = useGetOperationsQuery({ code, page });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderHeader = () => {
    if (accountOpe?.items.length === 0 || !accountOpe) {
      return null;
    } else {
      return (
        <Text style={stylesOperations.textOperaciones}>
          Últimas operaciones
        </Text>
      );
    }
  };
  if (isLoading) {
    return <OperationQuerySkeleton />;
  }
  const renderItem = (item: Operations) => {
    return (
      <MyOperations
        amountOpe={item.amountTransferred}
        fetchOpe={item.createdAt}
        transaction={item.type}
        operation={item.sourceAccount.address === code ? "SEND" : "GET"}
        onPressDetail={() =>
          //@ts-ignore
          navigation.navigate("DetailsOperations", {
            dateOpe: item.createdAt,
            amountOpe: item.amountTransferred,
            accountOpe: item.sourceAccount.address,
            descriptionOpe: item.description,
            idOpe: item.transactionNumber,
            typeOpe: item.type,
            blocked: "none",
            entity: entityName,
            sourceCard: item.sourceAccount.address,
            targetCard: item.targetAccount.address,
            typeOfTransacction:
              item.type === "PAYMENT"
                ? "PAYMENT"
                : item.sourceAccount.address === code
                ? "SEND"
                : "GET",
          })
        }
      />
    );
  };
  const currentPage = accountOpe?.currentPage || 1;
  const totalPages = accountOpe?.totalPages || 0;
  // const totalItems = data?.totalItems || 0;
  const showFooter = isFetching && currentPage < totalPages;

  const handelNext = () => {
    setPage(page + 1);
  };
  const handelBack = () => {
    setPage(page - 1);
  };
  console.log(page);
  return (
    <>
      <FlatList
        data={accountOpe?.items || []}
        renderItem={({ item }) => (
          <MyOperations
            amountOpe={item.amountTransferred}
            fetchOpe={item.createdAt}
            transaction={item.type}
            operation={item.sourceAccount.address === code ? "SEND" : "GET"}
            onPressDetail={() =>
              //@ts-ignore
              navigation.navigate("DetailsOperations", {
                dateOpe: item.createdAt,
                amountOpe: item.amountTransferred,
                accountOpe: item.sourceAccount.address,
                descriptionOpe: item.description,
                idOpe: item.transactionNumber,
                typeOpe: item.type,
                blocked: "none",
                entity: entityName,
                sourceCard: item.sourceAccount.address,
                targetCard: item.targetAccount.address,
                typeOfTransacction:
                  item.type === "PAYMENT"
                    ? "PAYMENT"
                    : item.sourceAccount.address === code
                    ? "SEND"
                    : "GET",
              })
            }
          />
        )}
        ListFooterComponent={
          // FIXME: LOADING ONLY IF END REACHED AND IS LOADING MORE DATA
          <FooterList isLoading={showFooter} />
        }
        keyExtractor={(item) => item.transactionNumber}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<PlaceHolderOpe />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        onEndReached={() => {
          if (currentPage < totalPages) {
            setPage(currentPage + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
