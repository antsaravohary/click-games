import Button from "@components/ui/button";
import * as yup from "yup";
import Input from "@components/ui/input";
import Loader from "@components/ui/loader/loader";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { update } from "lodash";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import order from "@repositories/order";
import { useEffect, useState } from "react";
import http from "@utils/api/http";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
type FormValues = {
  shipping_company: {
    label: string;
    value: string;
  };
  tracking_number: string;
  tracking_url: string;
  weight: string;
  code_click_collect: string;
};
const validationForm = (click_collect: string) =>
  yup.object().shape({
    /*shipping_company: yup
            .object()
            .typeError("Entreprise de livraison requis!")
            .required("Entreprise de livraison requis!"),
    tracking_number:
      click_collect === "full"
        ? yup.string()
        : yup.string().required("Numero de suivi requis!"),*/
    weight: yup
      .number()
      .typeError("Le poid doit être un nombre")
      .positive("Veuillez entrer un nombre positif")
      .required("Poid requis!"),

  });

const shippingCompanyData = [
  { label: "La poste", value: "La poste" },
  { label: "Colissimo", value: "Colissimo" },
  { label: "UPS", value: "UPS" },
  { label: "Fedex", value: "Fedex" },
];
const DeliveryForm = () => {
  const { data } = useModalState();
  console.log("data", data);
  const { closeModal } = useModalAction();
  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const [loadingLabel, setLoadingLabel] = useState(false);
  const { t } = useTranslation();
  const generate_label = () => {

  }
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationForm(data?.order?.mode_click_collect)),
    defaultValues: { weight: "0.25" }
  });
  const code_retrait =
    "S" +
    data?.order?.shop_id +
    "C" +
    data?.order?.id +
    Math.floor(data?.order?.paid_total);
  const onSumbit = (values: FormValues) => {
    if (data?.order?.generate_label != true) {
      setLoadingLabel(true);
      http.post("/label/" + data?.order?.ref, { weight: values?.weight }).then(
        response => {
          toast.success(response?.data);
        }
      ).catch((error) => {
        toast.error(error?.response?.data?.message);
      }).finally(() => {
        const queryClient = useQueryClient();
        queryClient?.invalidateQueries(API_ENDPOINTS?.ORDERS);
        setLoadingLabel(false);
        closeModal();
      })
    } else {
      updateOrder(
        {
          variables: {
            id: data?.order?.id as string,
            input: {
              /*tracking_number: values?.tracking_number as string,
              shipping_company: values?.shipping_company?.label as string,
              tracking_url: values?.tracking_url as string,
              weight:values?.weight as number,*/
              status: data?.orderStatus?.id as string,
              /*  code_click_collect:
                  data?.order?.mode_click_collect !== "none" ? code_retrait : null,*/
            },
          },
        },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }

  };

  if (data?.order?.mode_click_collect === "full") {
    useEffect(() => {
      updateOrder(
        {
          variables: {
            id: data?.order?.id as string,
            input: {
              status: data?.orderStatus?.id as string,
              code_click_collect:
                data?.order?.mode_click_collect !== "none" ? code_retrait : null,
            },
          },
        },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }, [])
    return (
      <div className="flex justify-center items-center">
        <Loader text="Veuillez patientez svp!" />
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSumbit)}>
        <div className="flex flex-col  p-8 bg-white w-xl">
          {data?.order?.mode_click_collect !== "full" && (
            <>
              <Description
                title="Information sur la livrasion du produit"
                details=""
                className="w-full"
              />
              <Card className="w-full">
                {/* <div className="mb-5">
                  <Label>Nom de la société transporteur*</Label>
                  <SelectInput
                    name="shipping_company"
                    control={control}
                    options={shippingCompanyData}
                    isClearable={true}
                  />
                  <p className="text-red-500">
                    {errors?.shipping_company?.message}
                  </p>
                </div> */}
                {/* <Input
                  label="Numéro de suivi *"
                  {...register("tracking_number")}
                  error={t(errors.tracking_number?.message!)}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label="Lien de suivi"
                  {...register("tracking_url")}
                  error={t(errors.tracking_url?.message!)}
                  className="mb-5"
                /> */}
                {data?.order?.generate_label == true ? <div>
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="sm:grid py-2 sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Company de livraison</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data?.order?.shipping_company}</dd>
                    </div>
                    <div className="sm:grid py-2 sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Numero de suivie</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data?.order?.tracking_number}</dd>
                    </div>
                    <div className="sm:grid py-2 sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Lien de suivie</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 "> <div className="max-w-16 text-wrap"><a href={data?.order?.tracking_url}>{data?.order?.tracking_url}</a></div> </dd>
                    </div>
                  </dl> </div>

                  :
                  <Input
                    label="Poid [Kg]"
                    defaultValue="0.00"
                    {...register("weight")}
                    error={t(errors.weight?.message!)}
                    className="mb-5"
                  />}

              </Card>
            </>
          )}

          {/*data?.order?.mode_click_collect !== "none" && (
            <>
              <Description
                title="CLICK COLLECT MODE"
                details=""
                className="w-full mt-4"
              />
              <Card className="w-full">
                <Input
                  label="Code de retrait click collect"
                  {...register("code_click_collect")}
                  value={code_retrait}
                  error={t(errors.code_click_collect?.message)}
                  variant="outline"
                  className="mb-5"
                />
              </Card>
            </>
          )*/}
          {data?.order?.generate_label ? <Button
            loading={updating}
            variant="normal"
            className="mt-4 w-full"
            type="submit"
          >
            Expédier la commande
          </Button> : <Button
            loading={loadingLabel}
            disabled={loadingLabel}
            variant="normal"
            className="mt-4 w-full"
            type="submit"
          >
            Generer l'étiquette
          </Button>}

        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
