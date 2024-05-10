import { AxiosResponse } from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import APIServer from "../APIServer";
import { Area, EconomicCycle, Product, ProductCategory, StockAreaProduct, StockProduct, StockProductQuery } from "../Interfaces";
import { translateOptions } from "../utilsServer";
// import { closeSession, setUserSession } from "../../store/slices/systemSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
    startLoading: boolean;
}

export const useServer = ({ startLoading }: Props) => {
    const dispatch = useAppDispatch();
    
    const [error, setError] = useState<string | boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(startLoading);
    const [isFetching, setIsFetching] = useState<boolean>(startLoading);

    const clear = () => {
        setError(false);
        setIsLoading(false);
        setIsFetching(false);
    };

    const showError = (message: string) => {
        setError(message);
        Alert.alert("¡Algo no ha salido bien!", message, [
            {
                text: "Aceptar",
                onPress: () => {},
            },
        ]);
    };

   

   

   
    //Get more products until end is reached
    const lastPage = (lastPage: number) => {
        page < lastPage
            ? setPage(prevState => prevState + 1)
            : setEndReached(true);
    };
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [page, setPage] = useState(1);
    const [endReached, setEndReached] = useState(false);

    


    return {
        error,
        isLoading,
        isFetching,
        clear,

        //Segurity

        isLoadingList,
        
    };
};
