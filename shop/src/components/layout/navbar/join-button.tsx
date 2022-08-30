import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export default function JoinButton() {
  const { t } = useTranslation("common");
  const { openModal } = useModalAction();
  const router=useRouter();
  function handleJoin() {
    router.push("/login");
    // return openModal("LOGIN_VIEW");
  }
  return (
    <Button className="font-semibold" size="small" onClick={handleJoin}>
      {t("join-button")}
    </Button>
  );
}
