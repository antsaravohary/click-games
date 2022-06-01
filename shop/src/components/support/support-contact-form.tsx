import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { useTranslation } from "next-i18next";
import { Button, Link, TextArea } from "..";
import { useCreateTicket } from "@data/ticket/use-ticket-mutation";
import { useState } from "react";

const subject = [
    { value: "Problème d'affichage", label: "Problème d'affichage" },
    { value: "Autres", label: "Autres" },
]

const formSchema = yup.object().shape({
    subject: yup.object().required("error-subject-required"),
    description: yup.string().required("error-description-required"),
});
export default function SupportContactForm() {
    const { control, handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(formSchema) });
    const [success, setSuccess] = useState(false);
    const { t } = useTranslation();
    const { mutate: addTicket, isLoading } = useCreateTicket();
    const onSubmit = (values: any) => {
        addTicket({
            subject: values?.subject?.value,
            description: values?.description
        }, {
            onSuccess: () => {
                setSuccess(true);
            }
        });
    }
    if (success) {
        return (
            <div className="bg-green-100 p-4 rounded-md ">
                <p>Votre demande a été prise en compte <Link className="text-accent" href={"/supports"}> cliquer ici</Link> pour suivre l'évolution de votre demande</p>
            </div>)
    }
    return (<>
        <div className="bg-gray-100 p-4 rounded-md ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>

                </div>
                <Label className="">Sur quoi porte vos problème</Label>
                <SelectInput

                    name="subject"
                    control={control}
                    options={subject}
                    className="my-6"
                />
                <span>{t(errors.subject?.message!)}</span>
                <TextArea
                    label={t("text-description")}
                    {...register("description")}
                    variant="outline"
                    className="my-6 text-black"


                    rows={6}
                    error={t(errors.description?.message!)}
                />
                <div className="flex justify-end">
                    <Button loading={isLoading} disabled={isLoading} type="submit">{t("text-submit")}</Button>
                </div>
            </form>
        </div>

    </>);
}