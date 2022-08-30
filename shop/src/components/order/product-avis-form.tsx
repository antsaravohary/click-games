import Button from "@components/ui/button";
import Input from "@components/ui/input";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import TextArea from "@components/ui/text-area";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useCreateNoticeMutation } from "@data/notice/use-create-notice.mutation";
import { useNoticesQuery } from "@data/notice/use-notices.query";
import _ from "lodash";
import { useEffect, useState } from "react";
type MyProps = {
  value: number;
  setValue: any;
};
const ProductAvisForm = ({ product_id }: { product_id: string }) => {
  const [value, setValue] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [pseudo, setPseduo] = useState("");
  const { mutate: addNotice, isLoading } = useCreateNoticeMutation();
  const data = useModalState();
  const { data: dataMe, isLoading: loadingMe } = useCustomerQuery();
  const me=dataMe?.me;
  const { data: notices, isLoading: lodaingNotice } = useNoticesQuery({
    product_id: data?.data?.product_id,
    limit: 60,
    user_id: "me",
  });
  const { closeModal } = useModalAction();

  var indents = [];

  const handleSend = () => {
    addNotice(
      {
        star: value,
        pseudo: me?.pseudo??pseudo,
        comment: comment,
        product_id: data?.data?.product_id,
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };
  const notice = notices?.notices?.data[0];
  useEffect(() => {
    if (notice !== undefined) {
      setValue(notice.star);
      setPseduo(notice.pseudo);
      setComment(notice?.comment);
    }
  }, [notice]);
  for (var i = 0; i < 5; i++) {
    indents.push(
      <button
        key={i}
        value={i}
        onClick={(e) => {
          if (!notice) {
            setValue(parseInt(e.currentTarget.value));
          }
        }}
      >
        <svg
          className={`mx-1 w-4 h-4 fill-current cursor-pointer  hover:text-yellow-600 ${
            i <= value ? "text-yellow-500" : "text-gray-400"
          } `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </button>
    );
  }
  console.log("me",me);
  return (
    <div className="bg-white flex flex-col p-8">
      {lodaingNotice && loadingMe ? (
        <>
          <div className="text-md"> Chargment ....</div>
        </>
      ) : (
        <>
          <h4>
            {" "}
            {notice
              ? "Merci d'avoir donnez votre avis sur ce produit"
              : "Donnez votre avis sur ce produit"}
          </h4>

          <div className="flex justify-center items-center">
            <div className="flex items-center mt-2 mb-4">
              {indents.map((i) => i)}
            </div>
          </div>
      
            <Input
              className={me?.pseudo?"hidden":""}
              name="pseudo"
              label="Choisissez votre pseudo"
              value={me?.pseudo??pseudo}
              readOnly={notice !== undefined||me?.pseudol}
              onChange={(e) => setPseduo(e.currentTarget.value)}
              required={true}
            />
    

          <TextArea
            onChange={(e) => setComment(e.currentTarget.value)}
            value={comment}
            label="Votre commentaire"
            readOnly={notice !== undefined}
            name="comment"
          />
          {!notice && (
            <Button
              loading={isLoading}
              onClick={handleSend}
              className="mt-4"
              size="small"
              variant="normal"
            >
              Envoyer
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAvisForm;
