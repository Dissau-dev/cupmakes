
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../root";



// Definimos la interfaz para la dirección
interface Address {
    firstName: string;
    lastName: string;
    companyName?: string;
    country: string;
    streetAddress: string;
    apartmentSuiteUnitEtc?: string;
    townCity: string;
    state: string;
    zipCode: string;
  }
  
  // Estado inicial con una lista de direcciones vacía
  interface AddressState {
    addresses: Address[];
  }
  
  const initialState: AddressState = {
    addresses: [],
  };

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.addresses.splice(action.payload, 1);
    },
    updateAddress: (state, action: PayloadAction<{ index: number; address: Address }>) => {
      const { index, address } = action.payload;
      state.addresses[index] = address;
    },
  },
  
});



// Exportamos las acciones generadas y el reducer
export const { addAddress, removeAddress, updateAddress } = addressesSlice.actions;
export const selectAddresses = (state:RootState) =>state.addresses.addresses
export default addressesSlice.reducer;


