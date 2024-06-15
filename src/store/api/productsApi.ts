//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";

import { Image, ProductResponse, Products, Ticket, TicketResponse} from '../../services/Interfaces';
import {
  User,
} from "../../services/Interfaces";
//import crashlytics from "@react-native-firebase/crashlytics";
import { PostOrderDeliveryArgs, PostRegister } from "../intefaces";
import { AxiosResponse } from "axios";

export interface PaginatedResponse<T> {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
   data: T[];
}


export const productsApi = api.injectEndpoints({
  endpoints(build) {
    return {
    
      createOrder: build.mutation<boolean, PostOrderDeliveryArgs>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const response = await baseQuery({
              url:   "/orders",
              method: "POST",
              data: arg,
            });
            
            if (response.data) {
              return { data: true };
            }
            return { error: response.error };
          } catch (error) {
            console.log(error)
          //  crashlytics().log("Something failed while register  the user");
         //   crashlytics().recordError(error as any);
   return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["ORDERS"] : []),
      }),
   /*   getAllProducts: build.query<PaginatedResponse<Products>,
        { page: number; search?: string; type?: string }
      >({
        query: ({ page, search, type }) => ({
          url: `/products?page=${page}&per_page=${10}`,
          // url: `/administration/product?page=${page}&search=${search}`,
          method: "GET",
          params: {
            search: search,
            ...(type && { type: type }),
          },
        }),
          transformResponse: (response) => {
        
          const totalProducts = parseInt(response.totalProducts);
          const totalPages = parseInt(response.totalPages);
          const  currentPage = parseInt(response.currentPage )|| 1
          console.log(currentPage)
          return { data: response, totalProducts, totalPages, currentPage };
        },
        
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          return `${endpointName}-${queryArgs.search}`;
        },
        merge: (currentCache, newItems) => {
          if (newItems.currentPage !== 1) {
           // Verificar si el primer item de newItems.data ya existe en currentCache.data para evitar duplicados
      const lastIndex = currentCache.data.length - 1;
      const lastItem = currentCache.data[lastIndex];
      const firstNewItem = newItems.data[0];

      if (lastItem?.id === firstNewItem?.id) {
        newItems.data.shift(); // Eliminar el primer item si es un duplicado
      }

      currentCache.data.push(...newItems.data);
      currentCache.currentPage = newItems.currentPage;
      currentCache.totalProducts = newItems.totalProducts;
      currentCache.totalPages = newItems.totalPages;
          } else {
            return newItems;
          }
        },
        // Always merge incoming data to the cache entry
    /*   merge: (currentCache, newItems) => {
          if (newItems.currentPage !== 1) {
            // if (!isEqual(currentCache, newItems)) {
            currentCache.currentPage = newItems.currentPage;
            currentCache.data.push(...newItems.data);
          } else {
            return newItems;
          }
        },*/
        // Refetch when the page arg changes
     /*   forceRefetch({ currentArg, previousArg }) {
          return currentArg?.page !== previousArg?.page;
          // return !isEqual(currentArg, previousArg);
        },
        
        providesTags: (result, error, arg) =>
          result
            ? [
                // Provides a tag for each post in the current page,
                // as well as the 'PARTIAL-LIST' tag.
                ...result.data.map(({id}) => ({
                  type: "Product" as const,
                  id
                })),
                { type: "Product", id: "PARTIAL-LIST" },
              ]
            : [{ type: "Product", id: "PARTIAL-LIST" }],
      }),*/
      getAllProducts: build.query<string[], number>({
        query: (page) => ({
          url: `/products?page=${page}&per_page=10`,
          method: "GET",
        }),
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
        // Always merge incoming data to the cache entry
      
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
      }),
      /*getAllProducts: build.query<ProductResponse,void>({
        query: () => ({
          url: `/products?per_page=11`,
          method: "GET",
        }),
        transformResponse: (response) => {
          
          const totalProducts = response.totalProducts
          const totalPages = response.totalPages
          return { data: response, totalProducts, totalPages,page };
        },
        providesTags: ["Product"],
      }),*/
      getBestSeller: build.query<ProductResponse,void>({
        query: () => ({
          url: `/products?orderby=popularity&per_page=5&order=desc`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getAllProductsTestId: build.query<ProductResponse,void>({
        query: () => ({
          url: `/products?category=37`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getAllCategories: build.query<ProductResponse,void>({
        query: () => ({
          url: `/products/categories`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
     
  
      getProductByCategory: build.query<any,number>({
        query: (id) => ({
          url: `/products?category=${id}`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getProductById: build.query<any,number>({
        query: (id) => ({
          url: `/products/${id}`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getOrdersCustomer: build.query<any,number>({
        query: (id) => ({
          url: `/orders?customer=${id}&per_page=10&order=desc`,
          method: "GET",
        }),
        providesTags: ["ORDERS"],
      }),
    };
  },
  overrideExisting: true,
});

export const {

  useCreateOrderMutation,
useGetAllProductsQuery,

useGetProductByCategoryQuery,

useGetAllCategoriesQuery,
useGetAllProductsTestIdQuery,
useGetProductByIdQuery,
useGetBestSellerQuery,
useGetOrdersCustomerQuery
} = productsApi;
