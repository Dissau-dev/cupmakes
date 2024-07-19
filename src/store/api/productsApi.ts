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
            
              return { data: response.data };
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
      updateOrderStatus: build.mutation<
      any,
      { id: string | number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: (result) => (result ? ["ORDERS"] : []),
    }),
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

      getProductById: build.query({
        query: (id) => ({
          url: `/products/${id}`,
        }),
        providesTags: (result, error, id) => [{ type: 'Product', id }],
      }),
    getRelatedProductsByIds: build.query({
      async queryFn(relatedIds, _queryApi, _extraOptions, baseQuery) {
        if (relatedIds.length === 0) {
          return { data: [] };
        }

        const relatedProductsPromises = relatedIds.map((relatedId) =>
          baseQuery({
            url: `/products/${relatedId}`,
          })
        );

        const relatedProductsResponses = await Promise.allSettled(relatedProductsPromises);
        const relatedProducts = relatedProductsResponses.map((result) => {
          if (result.status === 'fulfilled') {
            return result.value.data;
          }
          return null;
        }).filter((product) => product !== null);

        return { data: relatedProducts };
      },
      providesTags: (result, error, relatedIds) =>
        relatedIds.map((id) => ({ type: 'Product', id })),
    }),
    
      getOrdersCustomer: build.query<any,number>({
        query: (id) => ({
          url: `/orders?customer=${id}&per_page=10&order=desc`,
          method: "GET",
        }),
        providesTags: ["ORDERS"],
      }),
      updateCustomer: build.mutation<
        any,
        { customerId: string | number; data: any }
      >({
        query: ({ customerId, data }) => ({
          url: `/customers/${customerId}`,
          method: "PUT",
          data: data,
        }),
        invalidatesTags: (result) => (result ? ["User"] : []),
      }),
      changePassword: build.mutation({
        query: ({ customerId, currentPassword, newPassword }) => ({
          url: `/customers/${customerId}/change-password`,
          method: 'PUT',
          body: {
            current_password: currentPassword,
            new_password: newPassword,
          },
        }),
      }),
    };
  },
  overrideExisting: true,
});

export const {

  useCreateOrderMutation,
useGetAllProductsQuery,
useChangePasswordMutation,
useGetProductByCategoryQuery,
useUpdateOrderStatusMutation,
useGetAllCategoriesQuery,
useGetAllProductsTestIdQuery,
useGetProductByIdQuery,
useGetBestSellerQuery,
useUpdateCustomerMutation,
useGetOrdersCustomerQuery,
useGetRelatedProductsByIdsQuery,
} = productsApi;
