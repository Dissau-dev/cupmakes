import { OrdersDetail } from '../screens/carStore/OrdersDetail';
import { Address } from '../store/slices/addressesSlice';



export type MainParamList = {
    AppNavigator: undefined;
   // AuthenticationNavigator: undefined;
  };
  export type AppParamList = {
    HomeNavigator: undefined; 
    ProductsNavigator: undefined;
    CarNavigator?:undefined;
    AuthNavigator?:undefined,
    AuthProfileNavigator?:undefined,
    ProfileNavigator: undefined,
    TabsNavigator: undefined,
    
  };
  export type AuthenticationParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined; 
  };


  export type TabsParamList = {
    HomeNavigator: undefined;
    ProductsNavigator: undefined;
    ProfileNavigator: undefined,
    CarNavigator?: undefined;
    AuthNavigator?:undefined;
    AuthProfileNavigator?:undefined;
  };


export type HomeParamList = {
    HomeScreen:undefined;
  WitchesListScreen:undefined;
  LocationScreen: undefined;
  };

  export type CarParamList = {
    CarScreen: undefined;
    MyCartScreen: undefined;
    MyOrderScreen:undefined;
    TakeOrderScreen:{isSelected:boolean,Address?:Address };
    OrdersDetail:undefined;
  SelectAddress: undefined;
    SuccessOrder:undefined;
}
export type ProductsParamList = {
    ProductsScreen: undefined;
    ProductListScreen: {id:number | any, titleScreen:string} ;
    ProductDescrip: {titleScreen:string,id:number}
    SearchProducts: {titleScreen:string}
}
export type AuthProfileParamsList = {
  LoginProfileScreen: undefined;
  RegisterProfileScreen: undefined; 
}
export type ProfileParamList = {
  
  ProfileScreen: undefined;
  OrdersScreen:undefined,
  OrdersDetail:undefined,
  AddressScreen: undefined,
  AddAddress: {type: "DELIVERY" | "PICKUP", title:string, id?:any ,isEditing?: boolean,  firstName?: string,
    lastName?: string,
    companyName?: string,
    streetAddress?: string,
    apartmentSuiteUnitEtc?: string,
    townCity?: string,
    state?: string,
    zipCode?: string | number},
  AccountDetails: undefined,
  WishListScreen:undefined,
  CompareScreen:undefined,


}