
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../root";

interface products {
    id: number, name: string, price: string | number ,quantity: number
}
interface lineItems {
  product_id: number | string
  quantity: number;
}

interface initialState {
  products: products[];
  lineItems: lineItems[];
}

const initialState : initialState = {
products: [],
lineItems: []
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const { id, name, price ,quantity} = action.payload;
      state.products.push({ id, name, price ,quantity});
    },
    addLineItems(state, action) {
      const { product_id ,quantity} = action.payload;
      state.lineItems.push({ product_id, quantity});
    },
    removeProduct: (state, action: any) => {
      const {id} = action.payload
      state.products = state.products.filter((item) => item.id !== id);
    },
  },
});

export const { addProduct,removeProduct,addLineItems } = cartSlice.actions;

export const selectProducts= (state: RootState) => state.cart.products;
export const selectLineItems= (state: RootState) => state.cart.lineItems;

export default cartSlice.reducer;
