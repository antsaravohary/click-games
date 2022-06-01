import http from "@utils/api/http";
import { useQuery } from "react-query";

export const fetchStripeCard = async () => {
    const { data } = await http.get(`stripe/cards`);
    return data.data;
  };
export const useStripeCardsQuery=()=>{
   return useQuery<any,Error>(["stripe/cards"],()=>fetchStripeCard());
}