
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../root";



// Definimos la interfaz para la dirección
export interface Address {
   type:'PICKUP' | "DELIVERY"
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
    addresses: [
      {
        type:'PICKUP',
        firstName: "", lastName: "", 
        companyName: "",
        country: "United States",
        streetAddress: "Bon Avenue #9001",
        apartmentSuiteUnitEtc: "",
        townCity: "San Jose",
        state: "california",
        zipCode: "",
      }
    ],
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

export const selectPickupAddresses = createSelector(
  (state: any) => state.address.addresses, // Obtén el estado de 'address'
  (addresses) => addresses.filter((address:Address) => address.type === 'PICKUP') // Filtra las direcciones de tipo 'PICKUP'
);
export const selectDeliveryAddresses = createSelector(
  (state: any) => state.address.addresses, // Obtén el estado de 'address'
  (addresses) => addresses.filter((address:Address) => address.type === 'DELIVERY') // Filtra las direcciones de tipo 'DELIVERY'
);

// Exportamos las acciones generadas y el reducer
export const { addAddress, removeAddress, updateAddress } = addressesSlice.actions;
export const selectAddresses = (state:RootState) =>state.addresses.addresses
export default addressesSlice.reducer;


