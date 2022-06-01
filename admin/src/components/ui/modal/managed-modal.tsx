import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "./modal.context";
const TagDeleteView = dynamic(() => import("@components/tag/tag-delete-view"));
const TaxDeleteView = dynamic(() => import("@components/tax/tax-delete-view"));
const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));
const PurchasePurposeViewModal = dynamic(
  () => import("@components/purchase/purchase-purpose-view-modal")
);
const ProductChoiceForm = dynamic(
  () => import("@components/product/product-choice-form")
);
const ShippingDeleteView = dynamic(
  () => import("@components/shipping/shipping-delete-view")
);
const CategoryDeleteView = dynamic(
  () => import("@components/category/category-delete-view")
);
const CouponDeleteView = dynamic(
  () => import("@components/coupon/coupon-delete-view")
);

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const TypeDeleteView = dynamic(
  () => import("@components/group/group-delete-view")
);
const AttributeDeleteView = dynamic(
  () => import("@components/attribute/attribute-delete-view")
);

const ApproveShopView = dynamic(
  () => import("@components/shop/approve-shop-view")
);
const DisApproveShopView = dynamic(
  () => import("@components/shop/disapprove-shop-view")
);
const RemoveStaffView = dynamic(
  () => import("@components/shop/staff-delete-view")
);
const DeliveryFormView = dynamic(
  () => import("@components/order/delivery-form")
);
const FormConfirmPassword = dynamic(
  () => import("@components/form/form-confirm-password")
);
const PromotionPriceTableForm = dynamic(
  () => import("@components/promotion/promotion-price-table-form")
);
const DeliveryRelayPoint = dynamic(
  () => import("@components/order/delivery-relay-point")
);
const QrCodeReaderModal = dynamic(
  () => import("@components/common/qr-code-reader-modal")
);
const ShippingLabel = dynamic(() => import("@components/order/shipping-label"));
const ArticleDeleteView = dynamic(
  () => import("@components/article/article-delete-view")
);
const PaymentForm = dynamic(
  () => import("@components/payment/payement-form.back")
);
const FaqDeleteView = dynamic(() => import("@components/faq/faq-delete-view"));
const SubscriptionPay = dynamic(
  () => import("@components/subscription/subscription-pay")
);
const SubscriptionDetail = dynamic(
  () => import("@components/subscription/subscription-detail")
);

const DeleteShop = dynamic(() => import("@components/shop/shop-delete-view"));

const RefundForm = dynamic(() => import("@components/order/refund-form"));
const DeliveryForm = dynamic(
  () => import("@components/delivery/delivery-form")
);
const PurchaseEditModal = dynamic(
  () => import("@components/purchase/purchase-edit-modal")
);
const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "DELETE_PRODUCT" && <ProductDeleteView />}
      {view === "DELETE_TYPE" && <TypeDeleteView />}
      {view === "DELETE_ATTRIBUTE" && <AttributeDeleteView />}
      {view === "DELETE_CATEGORY" && <CategoryDeleteView />}
      {view === "DELETE_COUPON" && <CouponDeleteView />}
      {view === "DELETE_SHOP" && <DeleteShop />}
      {view === "DELETE_TAX" && <TaxDeleteView />}
      {view === "DELETE_SHIPPING" && <ShippingDeleteView />}
      {view === "DELETE_TAG" && <TagDeleteView />}
      {view === "DELETE_ARTICLE" && <ArticleDeleteView />}
      {view === "BAN_CUSTOMER" && <BanCustomerView />}
      {view === "SHOP_APPROVE_VIEW" && <ApproveShopView />}
      {view === "SHOP_DISAPPROVE_VIEW" && <DisApproveShopView />}
      {view === "DELETE_STAFF" && <RemoveStaffView />}
      {view === "DELIVERY_FORM" && <DeliveryFormView />}
      {view === "CONFIRM_PASSWORD" && <FormConfirmPassword />}
      {view === "PROMOTION_PRICE_TABLE_FORM" && <PromotionPriceTableForm />}
      {view === "PRODUCT_CHOICE_FORM" && <ProductChoiceForm />}
      {view === "STRIPE_PAYMENT_FORM" && <PaymentForm />}
      {view === "DELETE_FAQ" && <FaqDeleteView />}
      {view === "SUBSCRIPTION_PAY" && <SubscriptionPay />}
      {view === "SUBSCRIPTION_DETAIL" && <SubscriptionDetail />}
      {view === "REFUND_FORM" && <RefundForm />}
      {view === "SHIPPING_LABEL" && <ShippingLabel />}
      {view === "DELIVERY_FORM_MODAL" && <DeliveryForm />}
      {view === "QR_READER_MODAL" && <QrCodeReaderModal />}
      {view === "PURCHASE_PURPOSE_FORM" && <PurchaseEditModal />}
      {view === "PURCHASE_PURPOSE_VIEW" && <PurchasePurposeViewModal />}
      
    </Modal>
  );
};

export default ManagedModal;
