import Input from "@components/ui/input";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import SelectInput from "@components/ui/select-input";
import { useCreateTicket } from "@data/ticket/use-ticket-mutation";
const TicketFormSchema = yup.object().shape({
  /* subject: yup.string().required("error-subject-required"),*/
  description: yup.string().required("error-description-required"),
});

const TicketForm = () => {
  const { t } = useTranslation("common");
  const data = useModalState();
  const { closeModal } = useModalAction();
  const {
    register,
    handleSubmit,
    /*reset,*/
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TicketFormSchema) });
  const {mutate:addTicket}=useCreateTicket();
  const onSubmit = (values:any) => {
    const s=data?.order?values.subject.value+"#"+data.data?.order?.ref:values.subject.value
      addTicket({subject:s,description:values.description,shop_id:data?.data?.order?.shop_id,order_id:data.data?.order?.id},{
        onSuccess:()=>{
            closeModal();
        }
      });
  };
  return (
    <form
      className="bg-white p-8 w-96"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
     {data&&<div className="flex flex-col mb-8" >
        <div className="flex">
          <span className="text-sm">Boutique: </span>
          <span  className="ml-4 text-sm text-gray-500">{data?.data?.order?.shop?.name}</span>
        </div>
        <div className="flex">
          <span className="text-sm">Réference: </span>
          <span  className="ml-4 text-sm text-gray-500">{data?.data?.order?.ref}</span>
        </div>
      </div>} 
      <SelectInput
        name="subject"
        control={control}
        options={[
          { value: "Commande non reçue", label: "Commande non reçue" },
          { value: "Autres", label: "Autres" },
        ]}
        className="my-6"
      />
      <span>{t(errors.subject?.message!)}</span>
      <TextArea
        label={t("text-description")}
        {...register("description")}
        variant="outline"
        className="my-6"
        rows={6}
        error={t(errors.description?.message!)}
      />

      <Button type="submit">{t("text-submit")}</Button>
    </form>
  );
};
export default TicketForm;
