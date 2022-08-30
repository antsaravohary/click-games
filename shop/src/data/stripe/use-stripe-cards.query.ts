import http from "@utils/api/http";
import { useQuery } from "react-query";

export const fetchStripeCards = async () => {
    const { data } = await http.get(`stripe/cards`);
    return data.data;
  };
export const fetchStripeCard=async(id:string)=>{
    const{data}=await http.get("stripe/card/"+id);
    return data;
  }
export const useStripeCardsQuery=()=>{
   return useQuery<any,Error>(["stripe/cards"],()=>fetchStripeCards());
}

export const UseStripeCardQuery=(id:string)=>{
  return useQuery <any, Error>(["stripe/card",id],()=>fetchStripeCard(id));
}