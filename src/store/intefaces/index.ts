import { User } from "../../services/Interfaces";
import { Question } from '../../components/atoms/support/Question';

export interface LoginDataInterface {
  user: User;
}

export interface LoginArgs {
  email: string;
  password: string;
}
export interface PostTicketsArgs {
  email: string;
  description: string;
  username: string,
  title: string,
  category: string
}
export interface PutTicketsArgs {
  id: string | number;
  description: string;
  title: string,
  category: string;
  email: string,
}

export  interface Question {
  _id: string,
  title: string
  description: string
  module: string
  product: {
      _id: string
      title: string
  }
}

export  interface QuestionResponse {
  total: number,
  items: Question[],
}
export  interface Ticket {
  _id: string
  title: string,
  username: string,
  email: string,
  description: string,
  category:string,
  status: "UNCOMPLETED" | "COMPLETED",
  user: {
      _id: string
      name: string
  }
}

export  interface TicketResponse {
  total: number,
  items: Ticket[],
}