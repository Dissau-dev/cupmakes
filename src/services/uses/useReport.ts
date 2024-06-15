import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";

import APIServer from "../APIServer";
import {
  Area,
  EconomicCycle,
  GraphSales,
  IpvData,
  IpvProduct,
  MostSelledProduct,
  Product,
  ProductsCategoryReport,
  SalesCategoryReport,
  SelledProductReport,
  Tip,
} from "../Interfaces";
import { translateOptions } from "../utilsServer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
  startLoading: boolean;
}

export const useReport = ({ startLoading }: Props) => {
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

  const [graphSelles, setGraphSelles] = useState<GraphSales[]>([]);
  const [mostSelledProducts, setMostSelledProducts] = useState<
    MostSelledProduct[]
  >([]);
  const findGraphSellesAndMostSelledProducts = async (
    options?: Object,
    onSuccess?: Function
  ) => {
    setError(false);
    setIsLoading(false);
    setIsFetching(true);

    const params = options ? `?${translateOptions(options)}` : "";

    await Promise.all([
      APIServer.get(`/report/incomes/sales/:mode`),
      APIServer.get(`/report/selled-products/most-selled`),
    ])
      .then((resp: AxiosResponse[]) => {
        setGraphSelles(resp[0].data);
        setMostSelledProducts(resp[1].data);
        onSuccess && onSuccess();
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          showError(message);
        } else {
          crashlytics().log(
            "Something failed while fetching graph and most selled products"
          );
          crashlytics().recordError(error);
          showError(
            `Upps... Ha ocurrido un error mientras se obtenían los reportes de productos. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
          );
        }
        setIsFetching(false);
      });
  };

  const [tipsReport, setTipsReport] = useState<Tip[]>();
  const findAllTips = async (economicCycleId: number, onSuccess?: Function) => {
    setError(false);
    setIsLoading(false);
    setIsFetching(true);

    await APIServer.get(`/report/tips/${economicCycleId}`)
      .then((resp: AxiosResponse) => {
        setTipsReport(resp.data);
        onSuccess && onSuccess();
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          setError(message);
        } else {
          crashlytics().log("Something failed while fetching tips report");
          crashlytics().recordError(error);
          setError(
            `Upps... Ha ocurrido un error mientras se obtenían los reportes de propinas. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
          );
        }
        setIsFetching(false);
      });
  };

  const [salesCategoriesReport, setSalesCategoriesReport] =
    useState<SalesCategoryReport[]>();

  const [selledProductsReport, setSelledProductsReport] =
    useState<SelledProductReport[]>();
  const findAllSelledProductsReport = async (
    options: Object,
    findSalesCategory?: boolean,
    onSuccess?: Function
  ) => {
    setError(false);
    setIsLoading(false);
    setIsFetching(true);

    const params = options ? `?${translateOptions(options)}` : "";

    await APIServer.get(`/report/selled-products${params}`)
      .then((resp: AxiosResponse) => {
        if (findSalesCategory) {
          let store_sections: SalesCategoryReport[] = [];

          store_sections.push({
            id: 0,
            name: "Todos",
          });

          resp.data.products.forEach((item: any) => {
            //Find  if  category exist
            const found = store_sections.find(
              (section: SalesCategoryReport) =>
                section.id === item.salesCategoryId
            );

            if (!found) {
              store_sections.push({
                id: item.salesCategoryId,
                name: item.salesCategory,
              });
            }
          });

          // store_sections = store_sections.sort((a: any, b: any) => {
          // return a.nameSalesCategory.toUpperCase() > b.nameSalesCategory.toUpperCase() ? 1 : -1;
          // });

          //console.log(store_sections)

          setSalesCategoriesReport(store_sections);
        }

        setSelledProductsReport(resp.data.products);
        onSuccess && onSuccess();
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          setError(message);
        } else {
          crashlytics().log(
            "Something failed while loading selled products report"
          );
          crashlytics().recordError(error);
          setError(
            `Upps... Ha ocurrido un error mientras se obtenían los reportes. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
          );
        }
        setIsFetching(false);
      });
  };

  const [productsCategoriesReport, setProductsCategoriesReport] = useState<
    ProductsCategoryReport[]
  >([]);

  const [ipvData, setIpvData] = useState<IpvProduct[]>();
  const findIpvData = async (
    economicCycleId: number,
    areaId: number,
    findProductsCategory?: boolean,
    onSuccess?: Function
  ) => {
    setError(false);
    setIsLoading(false);
    setIsFetching(true);

    await APIServer.get(
      `/administration/stock/inventory/${economicCycleId}/${areaId}/`
    )
      .then((resp: AxiosResponse) => {
        let store_sections: ProductsCategoryReport[] = [];
        let categories = new Map<number | null, ProductsCategoryReport>();

        resp.data.products.forEach((item: IpvProduct) => {
          categories.set(item.productCategoryId, {
            id: item.productCategoryId,
            name: item.productCategory,
          });
        });

        store_sections = [...categories.values()];
        resp.data.products.length > 0 &&
          store_sections.unshift({
            id: 0,
            name: "Todos",
          });

        // store_sections = store_sections.sort((a, b) => {
        //   return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        // });

        setProductsCategoriesReport(store_sections);

        setIpvData(resp.data.products);
        onSuccess && onSuccess();
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          setError(message);
        } else {
          crashlytics().log(
            "Something failed while loading the products inventory reports"
          );
          crashlytics().recordError(error);
          setError(
            `Upps... Ha ocurrido un error mientras se obtenían los reportes de productos en el inventario. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
          );
        }
        setIsFetching(false);
      });
  };

  const { areasStore } = useAppSelector((store) => store.area);
  const [stockAreas, setStockAreas] = useState<Area[]>();
  const findAllStockAreas = () => {
    var areasStock: Area[] = areasStore.filter((area) => area.type === "STOCK");
    setStockAreas(areasStock);
  };

  return {
    error,
    isLoading,
    isFetching,
    clear,

    mostSelledProducts,
    graphSelles,
    findGraphSellesAndMostSelledProducts,

    findAllTips,
    tipsReport,

    findAllSelledProductsReport,
    selledProductsReport,
    salesCategoriesReport,

    findIpvData,
    ipvData,
    productsCategoriesReport,

    findAllStockAreas,
    stockAreas,
  };
};
