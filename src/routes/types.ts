import { OrdersDetail } from '../screens/carStore/OrdersDetail';



export type MainParamList = {
    AppNavigator: undefined;
   // AuthenticationNavigator: undefined;
  };
  export type AppParamList = {
    HomeNavigator: undefined; 
    ProductsNavigator: undefined;
    CarNavigator?:undefined;
    AuthNavigator?:undefined,
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
  };


export type HomeParamList = {
    HomeScreen:undefined;
  WitchesListScreen:undefined
  };

  export type CarParamList = {
    CarScreen: undefined;
    MyCartScreen: undefined;
    MyOrderScreen:undefined;
    TakeOrderScreen:undefined;
    OrdersDetail:undefined;
    SuccessOrder:undefined;
}
export type ProductsParamList = {
    ProductsScreen: undefined;
    ProductListScreen: {id:number | any, titleScreen:string} ;
    ProductDescrip: {titleScreen:string,id:number}
    SearchProducts: {titleScreen:string}
}

export type ProfileParamList = {
  
  ProfileScreen: undefined;
  OrdersScreen:undefined,
  OrdersDetail:undefined,
  AddressScreen: undefined,
  AccountDetails: undefined,
  WishListScreen:undefined,
  CompareScreen:undefined

}