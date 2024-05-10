//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";
import { closeSession, setSessionTokens } from "../slices/systemSlice";
import { Image, ProductResponse, Ticket, TicketResponse} from '../../services/Interfaces';
import {
  User,
} from "../../services/Interfaces";
//import crashlytics from "@react-native-firebase/crashlytics";
import {
  LoginArgs,
  PostTicketsArgs,
  PutTicketsArgs,
  QuestionResponse,
} from "../intefaces";



export const productsApi = api.injectEndpoints({
  endpoints(build) {
    return {
    
      createTicket: build.mutation<boolean, PostTicketsArgs>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const response = await baseQuery({
              url:   "/ticket",
              method: "POST",
              data: arg,
            });
            
            if (response.data) {
              return { data: true };
            }
            return { error: response.error };
          } catch (error) {
            console.log(error)
          //  crashlytics().log("Something failed while register  the user");
         //   crashlytics().recordError(error as any);
   return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["Tickets"] : []),
      }),
      editTicketstone: build.mutation<
      any,
      { id: string | number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/ticket/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: (result) => (result ? ["Tickets"] : []),
    }),
     
      getAllProducts: build.query<ProductResponse,void>({
        query: () => ({
          url: `/products`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getAllQuestions: build.query<QuestionResponse,void>({
        query: () => ({
          url: `/questions/all`,
          method: "GET",
        }),
        providesTags: ["Product"],
      }),
      getTickets: build.query<TicketResponse,void>({
        query: () => ({
          url: `/ticket`,
          method: "GET",
        }),
        providesTags: ["Tickets"],
      }),
    };
  },
  overrideExisting: true,
});

export const {

  useCreateTicketMutation,
useGetAllProductsQuery,
useGetAllQuestionsQuery,
useGetTicketsQuery,
useEditTicketstoneMutation
} = productsApi;
