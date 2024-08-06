import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SellerRespopnse {
    
        id: number,
        name: string,
        images: [
            {
                id: number,
                src: string,
                name: string,
                alt:string
            }
        ]
}

// Define el endpoint de la API
export const sellersApi = createApi({
  reducerPath: 'sellersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cupmakes.onrender.com/api' }),
  endpoints: (builder) => ({
    // Define el endpoint para la petición GET
    getSellers: builder.query<SellerRespopnse,void>({
        query: () => ({
          url: `/sellers`,
          method: "GET",
        }),
      }),
  }),
});

// Exporta el hook para utilizar en el componente
export const { useGetSellersQuery} = sellersApi;
