
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../root";



// Definimos la interfaz para la dirección
export interface Address {
  id: string | number; // Añadimos el campo id
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
        id: '1', 
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
    removeAddress: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.addresses = state.addresses.filter((address) => address.id !== idToRemove);
    },
    updateAddress: (state, action: PayloadAction<{ id: string; address: Address }>) => {
      const { id, address } = action.payload;
      const item = state.addresses.find((a) => a.id === id);
    
      if (item) {
        item.firstName = address.firstName;
        item.lastName = address.lastName;
        item.companyName = address.companyName;
        item.apartmentSuiteUnitEtc = address.apartmentSuiteUnitEtc;
        item.townCity = address.townCity;
        item.streetAddress = address.streetAddress;
        item.state = address.state;
        item.zipCode = address.zipCode;
      }
    }
  }
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


