import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrCodeReaderModal() {
  const {closeModal} = useModalAction();
  const { data } = useModalState();

  return (
    <div className="w-96 bg-white h-96">
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            data?.onResult(result.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
    </div>
  );
}
