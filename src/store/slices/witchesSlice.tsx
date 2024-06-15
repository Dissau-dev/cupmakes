import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root";

export interface productsInterface {
  id: number;
  name: string;
  likeStatus: "liked" | "unliked";
  price: string | number;
  date: string;
  quantity: number;
  totalItemPrice: number;
  images: [
    {
      id: number;
      date_created: string;
      date_created_gmt: string;
      date_modified: string;
      date_modified_gmt: string;
      src: string;
      name: string;
      alt: string;
    }
  ];
}

interface initialState {
  products: productsInterface[];
}

const initialState: initialState = {
  products: [],
};
const witchesSlice = createSlice({
  name: "witches",
  initialState,
  reducers: {
    /*} addProduct(state, action) {
      const { id, name, price ,quantity} = action.payload;
      state.products.push({ id, name, price ,quantity});
    },*/
    addLikedProduct: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.products.push(item);
      }
      const calculatedFullPrice = state.products.reduce(
        (total, item) => total + item.totalItemPrice,
        0
      );
    },

    removeLikedItem(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    cleanCart: (state) => {
      state.products = initialState.products;
    },
  },
});

export const { addLikedProduct, removeLikedItem, cleanCart } =
  witchesSlice.actions;

export const selectWitches = (state: RootState) => state.witches.products;

export default witchesSlice.reducer;
