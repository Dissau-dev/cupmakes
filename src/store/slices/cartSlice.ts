
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../root";

interface products {

    id: number, name: string, price: string | number ,quantity: number,totalItemPrice:number, images: [
      {
          id: number,
          date_created:string,
          date_created_gmt: string,
          date_modified: string,
          date_modified_gmt: string,
          src: string,
          name: string,
          alt: string,
      }
  ],
}
interface lineItems {
  product_id: number | string
  quantity: number;
}

interface initialState {

  products: products[];
  lineItems: lineItems[];
  fullPrice: number,
  lastUpdated: string | number | null,
}

const initialState : initialState = {

products: [],
lineItems: [],
fullPrice: 0,
lastUpdated: null,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addProduct: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find((i) => i.id === item.id);
    
      if (existingItem) {
        existingItem.quantity += item.quantity;
        //@ts-ignore
        existingItem.totalItemPrice = Number((existingItem.price * existingItem.quantity).toFixed(2));
      } else {
        state.products.push(item);
      }
    
      state.lastUpdated = Date.now();
      
      // Recalculate fullPrice
      const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
      state.fullPrice = Number(calculatedFullPrice.toFixed(2))
    },
 
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
      const linealItem = state.lineItems.find(item => item.product_id === action.payload);

      if (item && linealItem) {
        item.quantity += 1;
        linealItem.quantity +=1;
        //@ts-ignore
        const itemPrice  = item.price *item.quantity
        item.totalItemPrice = Number(itemPrice.toFixed(2))
        const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
        state.fullPrice = Number(calculatedFullPrice.toFixed(2));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
      const linealItem = state.lineItems.find(item => item.product_id === action.payload);
      if ((item && item.quantity > 1) && (linealItem && linealItem.quantity > 1) ) {
        item.quantity -= 1;
        linealItem.quantity -= 1;
        //@ts-ignore
        const itemPrice = item.price *item.quantity;
        item.totalItemPrice =  Number(itemPrice.toFixed(2));
        const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
        state.fullPrice = Number(calculatedFullPrice.toFixed(2));
      }
    },
    setInputQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === productId);
      const linealItemToUpdate = state.lineItems.find((product) => product.product_id === productId);
      if (productToUpdate && linealItemToUpdate) {
        productToUpdate.quantity = quantity;
        linealItemToUpdate.quantity = quantity;
      }
    },
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((p) => p.id === id);
      const linealItem = state.lineItems.find((p) => p.product_id === id)
      if (item && linealItem ) {
        item.quantity = quantity;
        linealItem.quantity = quantity
         //@ts-ignore
         const itemPrice = item.price *item.quantity;
         item.totalItemPrice =  Number(itemPrice.toFixed(2));
         const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
         state.fullPrice = Number(calculatedFullPrice.toFixed(2));
         
      }
    },
    addLineItems(state, action) {
      const item = action.payload;
      const {product_id, quantity} =item
      
      const existingItem = state.lineItems.find((i) => i.product_id === item.product_id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.lineItems.push({product_id,quantity});
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.products = state.products.filter(item => item.id !== action.payload);
      state.lineItems = state.lineItems.filter(item => item.product_id !== action.payload)
      const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
      state.fullPrice = Number(calculatedFullPrice.toFixed(2));
    },
    cleanCart: (state) => {
      state.products = initialState.products;
      state.fullPrice = initialState.fullPrice;
      state.lineItems = initialState.lineItems;
    },
  },
});

export const { addProduct,addLineItems,
 
  removeItem,cleanCart, decreaseQuantity,increaseQuantity,setInputQuantity,setQuantity} = cartSlice.actions;

export const selectProducts= (state: RootState) => state.cart.products;
export const selectFullPrice = (state: RootState) => state.cart.fullPrice;
export const selectLineItems= (state: RootState) => state.cart.lineItems;


export default cartSlice.reducer;


