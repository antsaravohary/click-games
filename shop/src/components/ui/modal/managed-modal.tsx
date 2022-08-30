import dynamic from "next/dynamic";
import Modal from "@components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import ShopProfileCard from "@components/profile/profile-card";
const PurchasePurposeViewModal = dynamic(
  () => import("@components/purchase/purchase-purpose-view-modal")
);
const PurchaseProductDetailModal = dynamic(
  () => import("@components/game/purchase-product-detail-modal")
);
const PaymentModalSuccess = dynamic(
  () => import("@components/payment/payment-modal-success")
);
const DeliveryForm = dynamic(
  () => import("@components/delivery/delivery-form")
);
const RepairTrackLabel = dynamic(
  () => import("@components/repair/repair-track-label")
);
const Login = dynamic(() => import("@components/auth/login"));
const Register = dynamic(() => import("@components/auth/register"));
const ForgotPassword = dynamic(
  () => import("@components/auth/forget-password/forget-password")
);
const ProductDetailsModalView = dynamic(
  () => import("@components/product/product-details-modal-view")
);
const CreateOrUpdateAddressForm = dynamic(
  () => import("@components/address/address-form")
);
const AddressDeleteView = dynamic(
  () => import("@components/address/address-delete-view")
);
const AddTicket = dynamic(() => import("@components/ticket/ticket-form"));

const ProductAvis = dynamic(
  () => import("@components/order/product-avis-form")
);
const PaymentForm = dynamic(() => import("@components/payment/payement-form"));
const DeliveryRelayPoint = dynamic(
  () => import("@components/checkout/delivery-relay-point")
);
const NoticeList = dynamic(() => import("@components/product/notice-list"));
const PaymentDeleteView = dynamic(
  () => import("@components/payment/payment-delete-view")
);
const GameSaleAddForm = dynamic(
  () => import("@components/game/game-sale-add-form")
);
const PayementError = dynamic(
  () => import("@components/payment/payement-error")
);
const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "LOGIN_VIEW" && <Login />}
      {view === "REGISTER" && <Register />}
      {view === "FORGOT_VIEW" && <ForgotPassword />}
      {view === "ADD_OR_UPDATE_ADDRESS" && <CreateOrUpdateAddressForm />}
      {view === "DELETE_ADDRESS" && <AddressDeleteView />}
      {view === "PRODUCT_DETAILS" && (
        <ProductDetailsModalView productSlug={data} />
      )}
      {view === "SHOP_INFO" && (
        <ShopProfileCard
          data={data}
          cardClassName="!hidden"
          className="!flex flex-col !w-screen !h-screen !rounded-none"
        />
      )}
      {view === "ADD_TICKET" && <AddTicket />}
      {view === "PRODUCT_AVIS" && <ProductAvis />}
      {view === "STRIPE_PAYMENT_FORM" && <PaymentForm />}
      {view === "DELIVERY_RELAY_POINT" && <DeliveryRelayPoint />}
      {view === "NOTICE_LIST" && <NoticeList />}
      {view === "DELETE_STRIPE_CARD" && <PaymentDeleteView />}
      {view === "GAME_SALE_ADD_FORM" && <GameSaleAddForm />}
      {view === "PAYMENT_ERROR" && <PayementError />}
      {view === "REPAIR_TRACK_LABEL" && <RepairTrackLabel />}
      {view == "DELIVERY_FORM" && <DeliveryForm />}
      {view == "PAYMENT_SUCCESS" && <PaymentModalSuccess />}
      {view === "PURCHASE_PRODUCT_DETAIL_MODAL" && (
        <PurchaseProductDetailModal />
      )}
      {view === "PURCHASE_PURPOSE_VIEW" && <PurchasePurposeViewModal />}
    </Modal>
  );
};

export default ManagedModal;
