import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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

const nodeServerBaseUrl = 'https://cupmakes.onrender.com/cupacakes/api'; // Cambia esto a la URL de tu servidor

// Función auxiliar para obtener productos desde el servidor Node.js
const fetchProductsFromNodeServer = async (page: number, perPage: number, filters: any) => {
  const params: any = { page, per_page: perPage };

  if (filters.categories && filters.categories.length > 0) {
    params['categories'] = filters.categories.join(',');
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

  console.log('Params:', params);  // Agregar este log

  const response = await axios.get(`${nodeServerBaseUrl}/products`, { params });

 console.log('Response:', response.data);  // Agregar este log
 
  const totalPages = response.data.totalPages; 
  const totalProducts = response.data.totalProducts; 
  return { data: response.data.data, totalPages, totalProducts };
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
      const currentProductsResponse = await fetchProductsFromNodeServer(page, 10, filters);
      const currentProducts = currentProductsResponse.data;
      const totalPages = currentProductsResponse.totalPages;
      const totalProducts = currentProductsResponse.totalProducts;

      // Fusionar productos actuales y siguientes, evitando duplicados
      let mergedProducts = [...state.product.items];
      currentProducts.forEach((product) => {
        if (!mergedProducts.find((item) => item.id === product.id)) {
          mergedProducts.push(product);
        }
      });

      return { items: mergedProducts, page, totalPages, totalProducts };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 1; // Reset page when filters change
      state.items = []; // Reset items when filters change
    },
    cleanAllFilters(state) {
      state.filters = initialState.filters;
      state.page = 1;
      state.items = [];
    },
  },
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

export const { setFilters, cleanAllFilters } = productSlice.actions;

export const selectCurrentData = (state: RootState) => state.product;
export const selectCurrentFilter = (state: RootState) => state.product.filters;

export default productSlice.reducer;
