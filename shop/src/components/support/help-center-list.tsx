import Accordion from "@components/ui/accordion";
import { useFaqQuery } from "@data/faq/use-faq.query";

export default function HelpCenterList() {

    const { data, isLoading: loading } = useFaqQuery();
    return (
        <div className="w-full mx-auto">
            {loading ? (
                <div>Chargement...</div>
            ) : (
                <Accordion items={data?.data} translatorNS="faq" />
            )}
        </div>)
}