import Layout from "@components/layout/layout";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Step1 from "@components/announces/create-form/step1";
import Step2 from "@components/announces/create-form/step2";
import Step3 from "@components/announces/create-form/step3";
import Step4 from "@components/announces/create-form/step4";
import Step5 from "@components/announces/create-form/step5";
import Step6 from "@components/announces/create-form/step6";
import { NEW_ANNONCE } from "@utils/constants";
import { AnimatePresence } from "framer-motion";
import { useCustomerQuery } from "@data/customer/use-customer.query";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};

export default function Create() {
  const { data:me} = useCustomerQuery();
  console.log("data",me);
  const [step, setStep] = useState<number>(1);
  const [product, setProduct] = useState<any>(
    localStorage.getItem(NEW_ANNONCE)
      ? JSON.parse(localStorage.getItem(NEW_ANNONCE) as string)
      : {
          name: "",
          categories: [],
        }
  );

  useEffect(() => {
    localStorage.setItem(NEW_ANNONCE, JSON.stringify(product));
  }, [product]);
  const updateProduct = (values: {}) => {
    setProduct({ ...product, ...values });
  };
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {step === 1 && (
          <Step1
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 2 && (
          <Step2
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && (
          <Step3
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 4 && (
          <Step4
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 5 && (
          <Step5
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 6 && (
          <Step6
            product={product}
            nextStep={nextStep}
            previousStep={previousStep}
            update={updateProduct}
            me={me.me}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
Create.Layout = Layout;
