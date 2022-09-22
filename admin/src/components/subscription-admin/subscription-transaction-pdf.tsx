import PriceView from "@components/common/price-view";
import { useSettings } from "@contexts/settings.context";
import {
  Page,
  Text,
  View,
  Document,
  
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Article } from "@ts-types/article-type";
import { Transaction } from "@ts-types/transactions-type";
import { formatAddress } from "@utils/format-address";
import { formatDateComplet, formatDateWithHours } from "@utils/format-date";
import usePrice from "@utils/use-price";
import dayjs from "dayjs";
dayjs.locale("fr");
export default function SubscriptionTransactionPdf({
  transaction,
  order,
  articles,
}: {
  transaction: Transaction;
  order: Transaction;
  articles: Article[];
}) {
  const { logo, siteTitle } = useSettings();
  return (
    <Document>
      <Page size="A4">
        <View style={{ paddingLeft: "20px", paddingTop: "10px" }}>
          <Image
            style={{ width: "120px", height: "auto" }}
            src={logo.thumbnail}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles?.textRight}>{formatDateComplet(Date())}</Text>
          </View>
          <View
            style={{
              paddingLeft: "40px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: "black",
              }}
            >
              <Text style={{ ...styles?.textObjet }}>
                {" "}
                Preuve de paiement Abonnement
              </Text>
            </View>
          </View>
          <View style={{ display: "flex", marginTop: "40t" }}>
            <Text style={styles.textLeft}>
              - Date de création de compte sur le site www.click-univers.com:{" "}
              {formatDateWithHours(transaction?.user?.created_at)}{" "}
              (Paris,France).
            </Text>
            <Text style={styles.textLeft}>
              - Date date d'acceptation des conditions et termes:{" "}
              {formatDateWithHours(transaction?.user?.created_at)}{" "}
              (Paris,France).
            </Text>
            {transaction?.user?.subscription?.status && (
              <Text style={styles.textLeft}>
                - Date de souscription ClickGames+:{" "}
                {formatDateWithHours(
                  transaction?.user?.subscription?.created_at
                )}
                (Paris,France).
              </Text>
            )}
          </View>
          <View style={{ display: "flex", marginTop: "20t" }}>
            <Text style={styles.textLeft}>Abonnement:</Text>
          </View>
          {/* Table */}
          <View style={styles.orderTable}>
            <View style={styles.tbody}>
              <View style={styles.tr}>
                <Text style={[styles.td, { flex: 1 }]}>
                  {transaction.object}
                </Text>
                <Text style={[styles.td, { width: 100, textAlign: "right" }]}>
                  <PriceView amount={transaction?.amount} />
                </Text>
              </View>
            </View>
          </View>

          <View style={{ display: "flex", marginTop: "20t" }}>
            <Text style={styles.textLeft}>Produit:</Text>
          </View>
          {/* Table */}
          <View style={styles.orderTable}>
            {order?.products?.map((product, index) => {
              return (
                <View style={styles.tbody} key={index}>
                  <View style={styles.tr}>
                    <Text
                      style={[styles.td, { width: 50, textAlign: "center" }]}
                    >
                      {product?.pivot?.order_quantity}
                    </Text>
                    <Text style={[styles.td, { flex: 1 }]}>{product.name}</Text>
                    <Text
                      style={[styles.td, { width: 100, textAlign: "right" }]}
                    >
                      <PriceView
                        amount={parseFloat(product?.pivot?.subtotal)}
                      />
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {transaction?.data?.order_ref ? (
            <View style={{ display: "flex", marginTop: "20t" }}>
              <Text style={styles.textLeft}>
                Cette abonnement est activé suite au l'activation du ClickGames+
                lors de la commande ref N° {transaction?.data?.order_ref} le{" "}
                {formatDateWithHours(transaction?.created_at)} sur le site
                click-univers:
              </Text>
            </View>
          ) : (
            <View style={{ display: "flex", marginTop: "20t" }}>
              <Text style={styles.textLeft}>
                Cette commande a été effectué par {transaction?.user?.name} le{" "}
                {formatDateWithHours(transaction?.created_at)} sur le site
                click-univers:
              </Text>
            </View>
          )}

          <View style={{ display: "flex", marginLeft: "10t" }}>
            <Text style={styles.textLeft}>
              - Mode de paiement: Carte bancaire fini par{" "}
              {transaction?.payment_info?.payment_method_details?.card?.last4}
            </Text>
            <Text style={styles.textLeft}>
              - Adresse de livraison:{" "}
              {formatAddress(transaction?.shipping_address?.address)}
            </Text>
            <Text style={styles.textLeft}>
              - Adresse IP du paiement: {transaction?.payment_info?.ip_client}
            </Text>
            <Text style={styles.textLeft}>
              - Validation par 3D Secure : Oui
            </Text>
          </View>
        </View>
        {articles && (
          <View style={styles.container}>
            {articles?.map((article) => (
              <View key={article?.id}>
                <Text style={styles.articleTitle}>{article?.title}</Text>
                <View>
                  {article?.items?.map((item) => (
                    <View key={item?.id}>
                      <Text style={styles.itemTitle}>{item?.title}</Text>
                      <Text style={styles.itemContent}>
                        <div
                          className="html-content"
                          dangerouslySetInnerHTML={{
                            __html: item?.content,
                          }}
                        />
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Bold",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    flex: 1,
    margin: "30pt",
    fontFamily: "Lato",
  },

  addressWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  section: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },

  articleTitle: {
    fontSize: 14,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "center",
  },
  itemTitle: {
    fontSize: 12,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },
  itemContent: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },

  addressText: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
  },
  textObjet: {
    fontSize: 14,
    color: "#0d0d0e",

    fontWeight: 600,
    textAlign: "center",
  },
  addressTextRight: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "right",
  },
  textRight: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "right",
  },
  textLeft: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },
  textCenter: {
    fontSize: 14,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "center",
  },

  orderTable: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  thead: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    display: "flex",
    flexDirection: "row",
  },

  th: {
    fontSize: 11,
    fontFamily: "Lato Bold",
    color: "#374151",
    padding: "12pt 16pt",
    borderRightWidth: 1,
    borderRightColor: "#ffffff",
    borderRightStyle: "solid",
  },

  tbody: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  tr: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },

  td: {
    fontSize: 11,
    color: "#0d0d0e",
    padding: "12pt 16pt",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#ffffff",
    borderRightStyle: "solid",
  },

  singleBorder: {
    width: "50%",
    display: "flex",
    marginLeft: "auto",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
    marginBottom: 2,
  },

  totalCountWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
  },

  totalCountRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalCountCell: {
    fontSize: 11,
    color: "#0d0d0e",
    padding: "8pt 16pt 2pt",
  },
});
