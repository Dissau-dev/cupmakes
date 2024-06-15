// productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_configs } from '../../config/system_config';
import { RootState } from '../root';
import { Products } from '../../services/Interfaces';

interface InitialState {
  items: Products[],
  page: number,
  totalPages: number,
  totalProducts: number,
  filters: {
    categories: number[],
    rating: number | null,
    priceRange: [number, number] | null,
    search: string | null,
  },
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null | unknown,
}

const initialState: InitialState = {
  items: [],
  page: 1,
  status: 'idle',
  error: null,
  totalPages: 1,
  totalProducts: 0,
  filters: {
    categories: [],
    rating: null,
    priceRange: null,
    search: null,
  },
}

let baseUrl = api_configs.BASE_URL;
const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";

const base64 = require("base-64");

const headers = {
  Authorization: "Basic " + base64.encode(consumerKey + ":" + consumerSecret)
};

// Función auxiliar para obtener productos
const fetchProductsFromApi = async (page: number, perPage: number,filters: any) => {
  const params = { page, per_page: perPage };

  if (filters.categories && filters.categories.length > 0) {
    params['category'] = filters.categories.join(',');
  }
  if (filters.rating) {
    params['rating'] = filters.rating;
  }
  if (filters.priceRange) {
    params['min_price'] = filters.priceRange[0];
    params['max_price'] = filters.priceRange[1];
  }
  if (filters.search) {
    params['search'] = filters.search;
  }
  const response = await axios.get(`${baseUrl}/products`, {
    headers,
    params: { page, per_page: perPage ,...filters}
  });
  
  const totalPages = parseInt(response.headers['x-wp-totalpages'], 10); // Obtén el total de páginas desde los headers
  const totalProducts = parseInt(response.headers['x-wp-total'], 10); // Obtén el total de productos desde los headers
  return { data: response.data, totalPages, totalProducts };

};

// Thunk para obtener los productos paginados
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (page: number, { getState, rejectWithValue }) => {
    try {
     
      const state = getState() as RootState;

       // Asegúrate de que `page` sea un entero
       page = Math.floor(page);
       const filters = state.product.filters;
       console.log('page: ' + page);
 
     // Obtener productos de la página actual
     const currentProductsResponse = await fetchProductsFromApi(page, 10,filters);
     const currentProducts = currentProductsResponse.data;
     const totalPages = currentProductsResponse.totalPages;
     const totalProducts = currentProductsResponse.totalProducts;

           // Obtener productos de la siguiente página (si existe)
           let nextProducts = [];
           if (page < totalPages) {
             const nextProductsResponse = await fetchProductsFromApi(page + 1, 10,filters);
             nextProducts = nextProductsResponse.data;
           }

        // Fusionar productos actuales y siguientes, evitando duplicados
        let mergedProducts = [...state.product.items];
        currentProducts.forEach((product) => {
          if (!mergedProducts.find((item) => item.id === product.id)) {
            mergedProducts.push(product);
          }
        });
        nextProducts.forEach((product) => {
          if (!mergedProducts.find((item) => item.id === product.id)) {
            mergedProducts.push(product);
          }
        });
  
        console.log('total merged :'+mergedProducts.length)
        // Solicitar 20 productos a partir de la página actual
        

       /*  console.log('aditional products.length :'+additionalProducts.length)
  
        // Reemplazar duplicados con productos únicos de la lista adicional
        additionalProducts.forEach((additionalProduct) => {
          if (
            !mergedProducts.find((item) => item.id === additionalProduct.id) &&
            mergedProducts.length < 8
          ) {
            const duplicateIndex = mergedProducts.findIndex((product) =>
              additionalProducts.find((item) => item.id === product.id)
            );
            if (duplicateIndex !== -1) {
              mergedProducts[duplicateIndex] = additionalProduct;
            }
          }
        });*/
        
      // Solicitar 20 productos a partir de la página actual
      const additionalProductsResponse = await fetchProductsFromApi(page, 20,filters);
      const additionalProducts = additionalProductsResponse.data;

      // Reemplazar duplicados con productos únicos de la lista adicional
      additionalProducts.forEach((additionalProduct) => {
        if (!mergedProducts.find((item) => item.id === additionalProduct.id)) {
          mergedProducts.push(additionalProduct);
        }
      });

      // Si estamos en la última página y faltan productos en mergedProducts, agregar productos faltantes
      if (page === totalPages && mergedProducts.length < totalProducts) {
        additionalProducts.forEach((additionalProduct) => {
          if (!mergedProducts.find((item) => item.id === additionalProduct.id)) {
            mergedProducts.push(additionalProduct);
          }
        });
      }


      return { items: mergedProducts, page ,totalPages ,totalProducts};
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {    setFilters(state, action) {
    state.filters = action.payload;
    state.page = 1; // Reset page when filters change
    state.items = []; // Reset items when filters change
  },
cleanAllFilters(state){
state.filters = initialState.filters
}},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
      
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unknown error occurred';
        }
      });
  },
});
export const { setFilters, cleanAllFilters} = productSlice.actions;

export const selectCurrentData = (state: RootState) => state.product;
export const selectCurrentFilter = (state: RootState) => state.product.filters;

export default productSlice.reducer;
