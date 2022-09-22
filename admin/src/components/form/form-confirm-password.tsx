import Button from "@components/ui/button";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";
import PasswordInput from "@components/ui/password-input";
import http from "@utils/api/http";
import { useTranslation } from "next-i18next";
import { useState } from "react";
const FormConfirmPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const data=useModalState();
  const {closeModal}=useModalAction();
  const checkPassword = () => {
    setLoading(true);
    http
      .post("/check-password", { password })
      .then((response) => {
        setLoading(false);
     
        if (response.data[0]===true) {
            closeModal();
            data.data.update();
            
        } else {
          setError("Mot de passe incorrect");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Mot de passe incorrect");
      });
  };

  return (
    <div className="flex flex-col bg-white p-4">
      <div className="p-4">
        <p>Vous avez modifier vos information bancaires</p>
        <p>Veuillez confirmer votre mot de passe</p>
      </div>
      <div>
        <PasswordInput
          label={t("form:input-label-password")}
          name="password"
          error={error}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          variant="outline"
          className="mb-4"
        />
        
        <Button className="w-full" onClick={checkPassword} loading={loading}>
          Confirmer
        </Button>
      </div>
    </div>
  );
};

export default FormConfirmPassword;
