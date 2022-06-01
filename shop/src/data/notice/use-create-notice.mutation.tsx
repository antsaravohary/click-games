import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { NoticeService, NoticeType } from "./notice.service";

export const useCreateNoticeMutation = () => {
  return useMutation((input: NoticeType) => NoticeService.create(input),{
      onSuccess:()=>{
        toast.success("Merci d'avoir donnée votre avis sur ce produit");
      }
  });
};
